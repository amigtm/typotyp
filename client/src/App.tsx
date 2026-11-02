import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import './App.less'
import { ThemeProvider } from './theme/ThemeProvider'
import { useTheme } from './theme/useTheme'
import { useTyping } from './hooks/useTyping'
import { tokenize } from './lib/tokenizer'
import { CodeDisplay } from './components/CodeDisplay'
import { VirtualKeyboard } from './components/VirtualKeyboard'
import { KeystrokeLog } from './components/KeystrokeLog'
import { Header } from './components/Header'

function TypotypApp() {
  const { theme } = useTheme()
  const typing = useTyping()
  const {
    snippet,
    snippetIndex,
    total,
    completing,
    episode,
    caret,
    errorAt,
    errorCount,
    keyCount,
    pressedKeys,
    shiftHeld,
    log,
  } = typing

  const types = useMemo(() => tokenize(snippet.code), [snippet])

  const vars = useMemo(
    () =>
      ({
        '--bg': theme.bg,
        '--text': theme.text,
        '--code-bg': theme.codeBg,
        '--accent': theme.accent,
        '--mono': theme.font,
      }) as CSSProperties,
    [theme],
  )

  const progress = snippet.code.length > 0 ? (caret / snippet.code.length) * 100 : 0

  return (
    <div className="app" style={vars}>
      <Header />

      <main className="app-main">
        <section className="snippet-meta">
          <span className="snippet-index">
            {snippetIndex + 1} / {total}
          </span>
          <h1 className="snippet-title">{snippet.title}</h1>
          <p className="snippet-desc">{snippet.description}</p>
          <span className="snippet-lang">{snippet.language}</span>
        </section>

        <div className={`code-panel${completing ? ' is-completing' : ''}`} key={episode}>
          <CodeDisplay
            code={snippet.code}
            types={types}
            caret={caret}
            errorAt={errorAt}
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
              Keystrokes <b>{keyCount}</b>
            </span>
            <span>
              Errors <b className={errorCount > 0 ? 'is-error' : ''}>{errorCount}</b>
            </span>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <KeystrokeLog log={log} />
        <VirtualKeyboard pressedKeys={pressedKeys} shiftHeld={shiftHeld} />
      </footer>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <TypotypApp />
    </ThemeProvider>
  )
}

export default App
