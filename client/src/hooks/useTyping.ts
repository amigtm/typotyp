import { useEffect, useReducer } from 'react'
import type { Language, Snippet } from '../data/snippets'

export const EXIT_MS = 800

const MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'])

interface TypingState {
  language: Language
  snippetIndex: number
  episode: number
  caret: number
  /** position -> the character the user actually typed (when it was wrong).
      Correctly-typed positions simply render the expected character. */
  mistakes: ReadonlyMap<number, string>
  errorCount: number
  keyCount: number
  pressedKeys: ReadonlySet<string>
}

type Action =
  | { type: 'press'; code: string }
  | { type: 'depress'; code: string }
  | { type: 'blur' }
  | { type: 'key'; key: string }
  | { type: 'tab' }
  | { type: 'backspace' }
  | { type: 'advance' }
  | { type: 'set-lang'; language: Language }

function initialState(language: Language): TypingState {
  return {
    language,
    snippetIndex: 0,
    episode: 0,
    caret: 0,
    mistakes: new Map(),
    errorCount: 0,
    keyCount: 0,
    pressedKeys: new Set(),
  }
}

function reducer(state: TypingState, action: Action): TypingState {
  switch (action.type) {
    case 'press': {
      if (state.pressedKeys.has(action.code)) return state
      const pressedKeys = new Set(state.pressedKeys)
      pressedKeys.add(action.code)
      return { ...state, pressedKeys }
    }

    case 'depress': {
      if (!state.pressedKeys.has(action.code)) return state
      const pressedKeys = new Set(state.pressedKeys)
      pressedKeys.delete(action.code)
      return { ...state, pressedKeys }
    }

    case 'blur':
      return { ...state, pressedKeys: new Set() }

    case 'set-lang':
      return initialState(action.language)

    case 'backspace': {
      const code = state.language.snippets[state.snippetIndex].code
      if (state.caret === 0 || state.caret >= code.length) return state
      return { ...state, caret: state.caret - 1 }
    }

    // Loose validation: any printable key advances the caret; the *typed*
    // character is shown and a mismatch is recorded once as an error
    // (rendered red) without blocking or cascading.
    case 'key': {
      const code = state.language.snippets[state.snippetIndex].code
      if (state.caret >= code.length) return state
      const pos = state.caret
      const mistakes = new Map(state.mistakes)
      let errorCount = state.errorCount

      if (action.key === code[pos]) {
        mistakes.delete(pos) // re-typing the correct char clears the mark
      } else {
        mistakes.set(pos, action.key)
        errorCount += 1
      }
      return {
        ...state,
        caret: pos + 1,
        mistakes,
        errorCount,
        keyCount: state.keyCount + 1,
      }
    }

    // Tab jumps over a run of indentation spaces (2+), otherwise it behaves
    // like a loose '\t' keystroke.
    case 'tab': {
      const code = state.language.snippets[state.snippetIndex].code
      if (state.caret >= code.length) return state

      let end = state.caret
      while (end < code.length && code[end] === ' ') end++
      if (end - state.caret >= 2) {
        return { ...state, caret: end, keyCount: state.keyCount + 1 }
      }

      const pos = state.caret
      const mistakes = new Map(state.mistakes)
      let errorCount = state.errorCount
      if (code[pos] === '\t') {
        mistakes.delete(pos)
      } else {
        mistakes.set(pos, '\t')
        errorCount += 1
      }
      return {
        ...state,
        caret: pos + 1,
        mistakes,
        errorCount,
        keyCount: state.keyCount + 1,
      }
    }

    case 'advance': {
      const snippets = state.language.snippets
      const next = (state.snippetIndex + 1) % snippets.length
      const fresh = initialState(state.language)
      return { ...fresh, snippetIndex: next, episode: state.episode + 1 }
    }
  }
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || target.isContentEditable
}

export function useTyping(language: Language, enabled: boolean) {
  const [state, dispatch] = useReducer(reducer, undefined, () => initialState(language))

  // Reset the session whenever the language changes so scores start fresh
  // even if the user returns to a previously-practiced language.
  useEffect(() => {
    dispatch({ type: 'set-lang', language })
  }, [language])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!enabled) return
      const { code, key, repeat, metaKey, ctrlKey, altKey } = event
      dispatch({ type: 'press', code })

      if (repeat || isEditableTarget(event.target) || metaKey || ctrlKey || altKey) return

      if (key === 'Backspace') {
        event.preventDefault()
        dispatch({ type: 'backspace' })
        return
      }
      if (key === 'Tab') {
        event.preventDefault()
        dispatch({ type: 'tab' })
        return
      }
      if (key === 'Enter') {
        event.preventDefault()
        dispatch({ type: 'key', key: '\n' })
        return
      }

      // Modifiers like Shift/Control are still captured above for keyboard
      // reflection, but only single printable characters advance the caret.
      if (MODIFIER_KEYS.has(key) || key.length !== 1) return

      dispatch({ type: 'key', key })
    }

    const onKeyUp = (event: KeyboardEvent) => {
      if (!enabled) return
      dispatch({ type: 'depress', code: event.code })
    }

    const onBlur = () => dispatch({ type: 'blur' })

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [enabled])

  const snippet: Snippet = state.language.snippets[state.snippetIndex]
  const completing = state.caret >= snippet.code.length

  // Completion transition: slide out, then advance to the next snippet.
  useEffect(() => {
    if (!completing) return
    const timer = window.setTimeout(() => dispatch({ type: 'advance' }), EXIT_MS)
    return () => window.clearTimeout(timer)
  }, [completing])

  return {
    language: state.language,
    snippet,
    snippetIndex: state.snippetIndex,
    total: state.language.snippets.length,
    episode: state.episode,
    completing,
    caret: state.caret,
    mistakes: state.mistakes,
    errorCount: state.errorCount,
    keyCount: state.keyCount,
    pressedKeys: state.pressedKeys,
    shiftHeld: state.pressedKeys.has('ShiftLeft') || state.pressedKeys.has('ShiftRight'),
  }
}