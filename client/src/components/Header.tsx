import { useState } from 'react'
import { MONO_FONTS } from '../theme/theme'
import { useTheme } from '../theme/useTheme'

export function Header() {
  const { theme, update, reset } = useTheme()
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-caret">_</span>
        <span className="brand-name">typotyp</span>
        <span className="brand-tag">practice typing code</span>
      </div>

      <div className="header-controls">
        <button
          type="button"
          className="theme-toggle"
          aria-expanded={panelOpen}
          onClick={() => setPanelOpen((v) => !v)}
        >
          Theme
        </button>
      </div>

      {panelOpen ? (
        <div className="theme-panel">
          <div className="theme-row">
            <label htmlFor="theme-bg">Background</label>
            <input
              id="theme-bg"
              type="color"
              value={theme.bg}
              onChange={(e) => update({ bg: e.target.value })}
            />
          </div>
          <div className="theme-row">
            <label htmlFor="theme-text">Text</label>
            <input
              id="theme-text"
              type="color"
              value={theme.text}
              onChange={(e) => update({ text: e.target.value })}
            />
          </div>
          <div className="theme-row">
            <label htmlFor="theme-code-bg">Code bg</label>
            <input
              id="theme-code-bg"
              type="color"
              value={theme.codeBg}
              onChange={(e) => update({ codeBg: e.target.value })}
            />
          </div>
          <div className="theme-row">
            <label htmlFor="theme-accent">Accent</label>
            <input
              id="theme-accent"
              type="color"
              value={theme.accent}
              onChange={(e) => update({ accent: e.target.value })}
            />
          </div>
          <div className="theme-row">
            <label htmlFor="theme-font">Font</label>
            <select
              id="theme-font"
              value={theme.font}
              onChange={(e) => update({ font: e.target.value })}
            >
              {MONO_FONTS.map((f) => (
                <option key={f.name} value={f.stack}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="theme-reset" onClick={reset}>
            Reset theme
          </button>
        </div>
      ) : null}
    </header>
  )
}
