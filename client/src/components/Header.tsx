import { useEffect, useState } from 'react'
import { MONO_FONTS, DEFAULT_THEME, THEME_PRESETS } from '../theme/theme'
import type { Theme } from '../theme/theme'
import { useTheme } from '../theme/useTheme'
import { DEFAULT_SOUND } from '../audio/sound'
import type { SoundPrefs } from '../audio/sound'
import { useSound } from '../audio/useSound'

interface HeaderProps {
  settingsOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function Header({ settingsOpen, onOpenChange }: HeaderProps) {
  const { theme, update } = useTheme()
  const { prefs, update: updateSound } = useSound()

  // Draft copies: edits only affect the page after Apply is pressed.
  const [draftTheme, setDraftTheme] = useState<Theme>(theme)
  const [draftSound, setDraftSound] = useState<SoundPrefs>(prefs)
  const [infoOpen, setInfoOpen] = useState(false)

  // Escape cancels the modal (or the info modal) without applying.
  useEffect(() => {
    if (!settingsOpen && !infoOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (infoOpen) {
          setInfoOpen(false)
        } else {
          onOpenChange(false)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [settingsOpen, infoOpen, onOpenChange])

  const open = () => {
    setDraftTheme(theme)
    setDraftSound(prefs)
    onOpenChange(true)
  }

  const cancel = () => onOpenChange(false)

  const apply = () => {
    update(draftTheme)
    updateSound(draftSound)
    onOpenChange(false)
  }

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
          className="settings-toggle"
          aria-expanded={settingsOpen}
          onClick={(e) => {
            open()
            e.currentTarget.blur()
          }}
        >
          Settings
        </button>
      </div>

      {settingsOpen ? (
        <div className="settings-modal" role="dialog" aria-modal="true" aria-label="Settings" onClick={cancel}>
          <div className="settings-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="panel-title">
              Settings
              <button
                type="button"
                className="info-toggle"
                aria-label="About typotyp and available settings"
                onClick={(e) => {
                  setInfoOpen(true)
                  e.currentTarget.blur()
                }}
              >
                info
              </button>
            </h2>

            <div className="panel-section">Theme presets</div>

            <div className="preset-grid">
              {THEME_PRESETS.map((preset) => {
                const active = preset.theme.bg === draftTheme.bg && preset.theme.accent === draftTheme.accent
                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={active ? 'preset-chip is-active' : 'preset-chip'}
                    title={preset.name}
                    onClick={() => {
                      // Keep the user's font choice; swap in preset colors.
                      setDraftTheme({ ...preset.theme, fontId: draftTheme.fontId })
                    }}
                  >
                    <span className="preset-swatches" aria-hidden="true">
                      <i style={{ background: preset.theme.bg }} />
                      <i style={{ background: preset.theme.codeBg }} />
                      <i style={{ background: preset.theme.accent }} />
                      <i style={{ background: preset.theme.text }} />
                    </span>
                    <span className="preset-name">{preset.name}</span>
                  </button>
                )
              })}
            </div>

            <div className="panel-section">Colors</div>

            <div className="theme-row">
              <label htmlFor="theme-bg">Background</label>
              <input
                id="theme-bg"
                type="color"
                value={draftTheme.bg}
                onChange={(e) => {
                  setDraftTheme({ ...draftTheme, bg: e.target.value })
                  e.currentTarget.blur()
                }}
              />
            </div>
            <div className="theme-row">
              <label htmlFor="theme-text">Text</label>
              <input
                id="theme-text"
                type="color"
                value={draftTheme.text}
                onChange={(e) => {
                  setDraftTheme({ ...draftTheme, text: e.target.value })
                  e.currentTarget.blur()
                }}
              />
            </div>
            <div className="theme-row">
              <label htmlFor="theme-code-bg">Code bg</label>
              <input
                id="theme-code-bg"
                type="color"
                value={draftTheme.codeBg}
                onChange={(e) => {
                  setDraftTheme({ ...draftTheme, codeBg: e.target.value })
                  e.currentTarget.blur()
                }}
              />
            </div>
            <div className="theme-row">
              <label htmlFor="theme-accent">Accent</label>
              <input
                id="theme-accent"
                type="color"
                value={draftTheme.accent}
                onChange={(e) => {
                  setDraftTheme({ ...draftTheme, accent: e.target.value })
                  e.currentTarget.blur()
                }}
              />
            </div>

            <div className="panel-section">Font</div>

            <div className="theme-row">
              <label htmlFor="theme-font">Code font</label>
              <select
                id="theme-font"
                value={draftTheme.fontId}
                onChange={(e) => {
                  setDraftTheme({ ...draftTheme, fontId: e.target.value })
                  e.currentTarget.blur()
                }}
              >
                {MONO_FONTS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="panel-section">Sound</div>

            <div className="theme-row">
              <label htmlFor="sound-keys">Key clicks</label>
              <input
                id="sound-keys"
                type="checkbox"
                checked={draftSound.keySounds}
                onChange={(e) => {
                  setDraftSound({ ...draftSound, keySounds: e.target.checked })
                  e.currentTarget.blur()
                }}
              />
            </div>
            <div className="theme-row">
              <label htmlFor="sound-key-volume">Click volume</label>
              <input
                id="sound-key-volume"
                type="range"
                min="0"
                max="100"
                value={Math.round(draftSound.keyVolume * 100)}
                onChange={(e) => {
                  setDraftSound({ ...draftSound, keyVolume: Number(e.target.value) / 100 })
                  e.currentTarget.blur()
                }}
              />
            </div>
            <div className="theme-row">
              <label htmlFor="sound-music">Music</label>
              <input
                id="sound-music"
                type="checkbox"
                checked={draftSound.music}
                onChange={(e) => {
                  setDraftSound({ ...draftSound, music: e.target.checked })
                  e.currentTarget.blur()
                }}
              />
            </div>
            <div className="theme-row">
              <label htmlFor="sound-music-volume">Music volume</label>
              <input
                id="sound-music-volume"
                type="range"
                min="0"
                max="100"
                value={Math.round(draftSound.musicVolume * 100)}
                onChange={(e) => {
                  setDraftSound({ ...draftSound, musicVolume: Number(e.target.value) / 100 })
                  e.currentTarget.blur()
                }}
              />
            </div>

            <button
              type="button"
              className="theme-reset"
              onClick={() => {
                setDraftTheme(DEFAULT_THEME)
                setDraftSound(DEFAULT_SOUND)
              }}
            >
              Reset to defaults
            </button>

            <div className="settings-actions">
              <button type="button" className="btn-settings ghost" onClick={cancel}>
                Cancel
              </button>
              <button type="button" className="btn-settings primary" onClick={apply}>
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {infoOpen ? (
        <div className="info-modal" role="dialog" aria-modal="true" aria-label="About typotyp" onClick={() => setInfoOpen(false)}>
          <div className="info-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="panel-title">About typotyp</h2>
            <p className="info-lead">A typing trainer for programmers — practice typing real code, snippet by snippet, and build muscle memory for the code you write.</p>
            <div className="info-section">What you can configure</div>
            <ul className="info-list">
              <li>
                <b>Language</b> — pick from TypeScript, Python, Rust, C/C++, Java, Zig, C#, Swift, Kotlin, Elixir and more to practice the right syntax.
              </li>
              <li>
                <b>Theme presets</b> — one-click editor themes (Dracula, One Dark Pro, Tokyo Night, Catppuccin, Night Owl, Matcha) or set your own colors.
              </li>
              <li>
                <b>Font</b> — choose a coding font loaded from Google Fonts, from JetBrains Mono to Fira Code and more.
              </li>
              <li>
                <b>Sound</b> — mechanical-keyboard click sounds on keystrokes and a calm procedural music loop while you type.
              </li>
              <li>
                <b>Reset</b> — restore everything to the defaults anytime with one click.
              </li>
            </ul>
            <button
              type="button"
              className="btn-settings primary info-done"
              onClick={() => setInfoOpen(false)}
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </header>
  )
}