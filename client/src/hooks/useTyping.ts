import { useEffect, useReducer } from 'react'
import { SNIPPETS } from '../data/snippets'
import type { Snippet } from '../data/snippets'

export interface Keystroke {
  id: number
  label: string
}

export const EXIT_MS = 650

const MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'])
const LOG_LIMIT = 15

interface TypingState {
  snippetIndex: number
  episode: number
  caret: number
  errorAt: number | null
  errorCount: number
  keyCount: number
  pressedKeys: ReadonlySet<string>
  log: Keystroke[]
  idCounter: number
}

type Action =
  | { type: 'press'; code: string }
  | { type: 'depress'; code: string }
  | { type: 'blur' }
  | { type: 'key'; key: string }
  | { type: 'backspace' }
  | { type: 'advance' }

function initialState(): TypingState {
  return {
    snippetIndex: 0,
    episode: 0,
    caret: 0,
    errorAt: null,
    errorCount: 0,
    keyCount: 0,
    pressedKeys: new Set(),
    log: [],
    idCounter: 1,
  }
}

function pushLog(log: Keystroke[], idCounter: number, label: string): [Keystroke[], number] {
  return [[...log.slice(-(LOG_LIMIT - 1)), { id: idCounter, label }], idCounter + 1]
}

function keyLabel(key: string): string {
  if (key === '\n') return '↵'
  if (key === '\t') return '⇥'
  if (key === ' ') return '␣'
  return key
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

    case 'backspace': {
      if (state.caret === 0) return state
      const [log, idCounter] = pushLog(state.log, state.idCounter, '⌫')
      return {
        ...state,
        caret: state.caret - 1,
        errorAt: null,
        keyCount: state.keyCount + 1,
        log,
        idCounter,
      }
    }

    case 'key': {
      const code = SNIPPETS[state.snippetIndex].code
      if (state.caret >= code.length) return state

      const expected = code[state.caret]
      const [log, idCounter] = pushLog(state.log, state.idCounter, keyLabel(action.key))

      if (action.key === expected) {
        const caret = state.caret + 1
        return {
          ...state,
          caret,
          errorAt: null,
          keyCount: state.keyCount + 1,
          log,
          idCounter,
        }
      }
      return {
        ...state,
        errorAt: state.caret,
        errorCount: state.errorCount + 1,
        keyCount: state.keyCount + 1,
        log,
        idCounter,
      }
    }

    case 'advance': {
      const next = (state.snippetIndex + 1) % SNIPPETS.length
      return {
        ...initialState(),
        snippetIndex: next,
        episode: state.episode + 1,
      }
    }
  }
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || target.isContentEditable
}

export function useTyping() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const { code, key, repeat, metaKey, ctrlKey, altKey } = event
      dispatch({ type: 'press', code })

      if (repeat || isEditableTarget(event.target) || metaKey || ctrlKey || altKey) return

      if (key === 'Backspace') {
        event.preventDefault()
        dispatch({ type: 'backspace' })
        return
      }

      // Map special keys to their text representation for strict matching.
      if (key === 'Enter') {
        event.preventDefault()
        dispatch({ type: 'key', key: '\n' })
        return
      }
      if (key === 'Tab') {
        event.preventDefault()
        dispatch({ type: 'key', key: '\t' })
        return
      }

      // Only single printable characters move the caret; modifiers like
      // Shift/Control are still captured above for the keyboard reflection.
      if (MODIFIER_KEYS.has(key) || key.length !== 1) return

      dispatch({ type: 'key', key })
    }

    const onKeyUp = (event: KeyboardEvent) => {
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
  }, [])

  const snippet: Snippet = SNIPPETS[state.snippetIndex]
  const completing = state.caret >= snippet.code.length

  // Completion transition: slide out, then advance to the next snippet.
  useEffect(() => {
    if (!completing) return
    const timer = window.setTimeout(() => dispatch({ type: 'advance' }), EXIT_MS)
    return () => window.clearTimeout(timer)
  }, [completing])

  return {
    snippet,
    snippetIndex: state.snippetIndex,
    total: SNIPPETS.length,
    episode: state.episode,
    completing,
    caret: state.caret,
    errorAt: state.errorAt,
    errorCount: state.errorCount,
    keyCount: state.keyCount,
    pressedKeys: state.pressedKeys,
    shiftHeld: state.pressedKeys.has('ShiftLeft') || state.pressedKeys.has('ShiftRight'),
    log: state.log,
  }
}
