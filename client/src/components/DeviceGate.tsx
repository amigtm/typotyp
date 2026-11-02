export function DeviceGate() {
  return (
    <div className="device-gate" role="dialog" aria-modal="true" aria-label="Large screen required">
      <div className="gate-card">
        <span className="gate-icon" aria-hidden="true">
          ⌨
        </span>
        <h2>Open on a larger screen</h2>
        <p>
          typotyp is built for desktop and tablet. The typing experience needs a
          real keyboard, so it's disabled on smaller screens.
        </p>
        <p className="gate-hint">Please open this page on a desktop or tablet to practice.</p>
      </div>
    </div>
  )
}