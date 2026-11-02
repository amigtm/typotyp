import { KEYBOARD_ROWS } from '../lib/keyboardLayout'
import type { KeyDef } from '../lib/keyboardLayout'

interface VirtualKeyboardProps {
  pressedKeys: ReadonlySet<string>
  shiftHeld: boolean
}

function KeyCap({ def, pressed, shiftHeld }: { def: KeyDef; pressed: boolean; shiftHeld: boolean }) {
  const classes = ['kb-key', def.kind === 'special' ? 'is-special' : '', pressed ? 'is-pressed' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={classes}
      style={{ flexGrow: def.width }}
      data-key={def.code}
      aria-hidden="true"
    >
      {def.shift && shiftHeld ? <span className="kb-key-shift">{def.shift}</span> : null}
      <span className="kb-key-main">{def.main}</span>
    </span>
  )
}

export function VirtualKeyboard({ pressedKeys, shiftHeld }: VirtualKeyboardProps) {
  return (
    <div className="keyboard" role="img" aria-label="on screen keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div className="kb-row" key={rowIndex}>
          {row.map((def) => (
            <KeyCap
              key={def.code}
              def={def}
              pressed={pressedKeys.has(def.code)}
              shiftHeld={shiftHeld}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
