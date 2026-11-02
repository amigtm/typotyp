import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import './App.less'
import { ThemeProvider } from './theme/ThemeProvider'
import { useTheme } from './theme/useTheme'
import { getFont, contrastText, tokensFor } from './theme/theme'
import { SoundProvider } from './audio/SoundProvider'
import { useSound } from './audio/useSound'
import { useTyping } from './hooks/useTyping'
import { useIsDesktop } from './hooks/useIsDesktop'
import { tokenize } from './lib/tokenizer'
import { LANGUAGES, DEFAULT_LANGUAGE_ID, getLanguage } from './data/snippets'
import { CodeDisplay } from './components/CodeDisplay'
import { VirtualKeyboard } from './components/VirtualKeyboard'
import { DeviceGate } from './components/DeviceGate'
import { Header } from './components/Header'

function TypotypApp() {
  const { theme } = useTheme()
  const { playKey, playError, playComplete } = useSound()
  const isDesktop = useIsDesktop()
  const [langId, setLangId] = useState(DEFAULT_LANGUAGE_ID)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const language = getLanguage(langId)
  const typing = useTyping(language, isDesktop && !settingsOpen)
  const {
    snippet,
    snippetIndex,
    total,
    completing,
    episode,
    caret,
    mistakes,
    errorCount,
    keyCount,
    pressedKeys,
    shiftHeld,
  } = typing

  const font = getFont(theme.fontId)
  const onAccent = contrastText(theme.accent)
  const tokens = tokensFor(theme.bg)

  // Trigger synthesized sounds when the session state moves. Refs keep us from
  // replaying sounds when prefs (and therefore the play fns) are recreated.
  const lastKeyCount = useRef(0)
  const lastErrorCount = useRef(0)
  const lastCompleting = useRef(false)
  useEffect(() => {
    if (keyCount !== lastKeyCount.current) {
      lastKeyCount.current = keyCount
      if (keyCount > 0) playKey()
    }
    if (errorCount !== lastErrorCount.current) {
      lastErrorCount.current = errorCount
      if (errorCount > 0) playError()
    }
    if (completing !== lastCompleting.current) {
      lastCompleting.current = completing
      if (completing) playComplete()
    }
  }, [keyCount, errorCount, completing, playKey, playError, playComplete])

  const types = useMemo(() => tokenize(snippet.code, language.id), [snippet, language.id])

  const vars = useMemo(
    () =>
      ({
        '--bg': theme.bg,
        '--text': theme.text,
        '--code-bg': theme.codeBg,
        '--accent': theme.accent,
        '--on-accent': onAccent,
        '--tok-keyword': tokens.keyword,
        '--tok-string': tokens.string,
        '--tok-number': tokens.number,
        '--tok-comment': tokens.comment,
        '--mono': `${font.family}, ${font.fallback}`,
      }) as CSSProperties,
    [theme, onAccent, tokens, font],
  )

  const progress = snippet.code.length > 0 ? (caret / snippet.code.length) * 100 : 0

  return (
    <div className="app" style={vars}>
      <Header settingsOpen={settingsOpen} onOpenChange={setSettingsOpen} />

      <main className="app-main">
        <section className="snippet-meta">
          <span className="snippet-index">
            {snippetIndex + 1} / {total}
          </span>
          <h1 className="snippet-title">{snippet.title}</h1>
          <p className="snippet-desc">{snippet.description}</p>
          <label className="lang-select">
            <span className="visually-hidden">Language</span>
            <select
              value={language.id}
              onChange={(e) => {
                setLangId(e.target.value)
                e.currentTarget.blur()
              }}
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
        </section>

        <div className={`code-panel${completing ? ' is-completing' : ''}`} key={episode}>
          <CodeDisplay
            code={snippet.code}
            types={types}
            caret={caret}
            mistakes={mistakes}
            completing={completing}
          />
        </div>

        <div className="stats">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="stats-values">
            <span>
              Progress <b>{Math.round(progress)}%</b>
            </span>
            <span>
              Keys <b>{keyCount}</b>
            </span>
            <span>
              Errors <b className={errorCount > 0 ? 'is-error' : ''}>{errorCount}</b>
            </span>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <VirtualKeyboard pressedKeys={pressedKeys} shiftHeld={shiftHeld} />
      </footer>

      {!isDesktop ? <DeviceGate /> : null}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <TypotypApp />
      </SoundProvider>
    </ThemeProvider>
  )
}

export default App