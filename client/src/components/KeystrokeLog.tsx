import type { Keystroke } from '../hooks/useTyping'

interface KeystrokeLogProps {
  log: Keystroke[]
}

export function KeystrokeLog({ log }: KeystrokeLogProps) {
  return (
    <div className="keystroke-log" aria-label="keystroke history">
      <span className="log-label">keys</span>
      {log.length === 0 ? (
        <span className="log-empty">—</span>
      ) : (
        log.map((k) => (
          <span key={k.id} className="log-chunk">
            {k.label}
          </span>
        ))
      )}
    </div>
  )
}
