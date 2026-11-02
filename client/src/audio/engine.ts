/**
 * Sound engine built entirely on the Web Audio API — no audio files and no
 * npm packages. Key presses produce a synthesized mechanical-keyboard clack,
 * errors a duller thud, and completion a short chime. A small procedural
 * music loop can run underneath for ambience.
 *
 * The AudioContext is created lazily on the first play call, which always
 * happens inside a user gesture (a keypress or a settings toggle).
 */

type OscKind = OscillatorType

const CLEANUP_MS = 60
const SILENCE = 0.0001

class AudioEngine {
  private ctx: AudioContext | null = null
  private sfxOut: GainNode | null = null
  private musicOut: GainNode | null = null
  private noiseBuffer: AudioBuffer | null = null
  private musicTimer: number | null = null
  private musicStep = 0
  private musicVolume = 0.5
  private sfxVolume = 1

  private ensure(): AudioContext | null {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume()
      return this.ctx
    }
    const Ctx = window.AudioContext
    if (typeof Ctx === 'undefined') return null
    try {
      const context = new Ctx()
      this.ctx = context
      this.sfxOut = context.createGain()
      this.sfxOut.gain.value = this.sfxVolume
      this.sfxOut.connect(context.destination)
      this.musicOut = context.createGain()
      this.musicOut.gain.value = this.musicVolume
      this.musicOut.connect(context.destination)

      // shared pseudo-white-noise buffer, reused for clicks
      const seconds = 0.25
      const buffer = context.createBuffer(1, Math.floor(context.sampleRate * seconds), context.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
      this.noiseBuffer = buffer
    } catch {
      this.ctx = null
    }
    return this.ctx
  }

  /** Probe: creates the context inside a user gesture. */
  prime(): boolean {
    return this.ensure() !== null
  }

  setSfxVolume(value: number): void {
    this.sfxVolume = value
    if (this.sfxOut) this.sfxOut.gain.value = value
  }

  setMusicVolume(value: number): void {
    this.musicVolume = Math.min(1, Math.max(0, value))
    if (this.musicOut) this.musicOut.gain.value = this.musicVolume
  }

  /* ---------------- key sounds ---------------- */

  private scheduleGain(g: GainNode, peak: number, startSec: number, decaySec: number): void {
    const startMs = Math.max(1, Math.round(startSec * 1000))
    const endMs = Math.max(1, Math.round((startSec + decaySec) * 1000) + 1)
    window.setTimeout(() => {
      g.gain.value = peak
    }, startMs)
    window.setTimeout(() => {
      g.gain.value = SILENCE
    }, endMs)
  }

  private tone(opts: {
    freq: number
    peak: number
    decay: number
    delay?: number
    kind?: OscKind
    out?: GainNode | null
  }): void {
    const c = this.ensure()
    if (!c) return
    const out = opts.out ?? this.sfxOut
    if (!out) return
    const start = c.currentTime + (opts.delay ?? 0.001)
    const osc = c.createOscillator()
    osc.type = opts.kind ?? 'sine'
    osc.frequency.value = opts.freq
    const env = c.createGain()
    env.gain.value = SILENCE

    osc.connect(env)
    env.connect(out)
    this.scheduleGain(env, opts.peak, opts.delay ?? 0.001, opts.decay)
    osc.start(start)
    osc.stop(start + opts.decay + CLEANUP_MS / 1000)
    osc.onended = () => {
      env.disconnect()
    }
  }

  private noiseClick(peak: number, decay: number, freq: number): void {
    const c = this.ensure()
    if (!c || !this.sfxOut || !this.noiseBuffer) return
    const startDelay = 0.001
    const start = c.currentTime + startDelay
    const src = c.createBufferSource()
    src.buffer = this.noiseBuffer
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = freq
    bp.Q.value = 1.1
    const env = c.createGain()
    env.gain.value = SILENCE

    src.connect(bp)
    bp.connect(env)
    env.connect(this.sfxOut)
    this.scheduleGain(env, peak, startDelay, decay)
    src.start(start)
    src.stop(start + decay + CLEANUP_MS / 1000)
    src.onended = () => {
      env.disconnect()
      bp.disconnect()
    }
  }

  /** Mechanical-keyboard clack: bright tick + noise burst + low thock. */
  playKey(): void {
    const c = this.ensure()
    if (!c) return
    const f = (min: number, max: number) => min + Math.random() * (max - min)

    this.tone({ freq: f(1700, 2500), peak: f(0.16, 0.24), decay: f(0.008, 0.014) })
    this.noiseClick(f(0.1, 0.16), 0.006, f(3800, 4800))
    this.tone({ freq: f(70, 105), peak: f(0.32, 0.46), decay: f(0.035, 0.06) })
  }

  /** Duller, rattly thud for a mistyped character. */
  playError(): void {
    const c = this.ensure()
    if (!c) return
    this.tone({ freq: 55 + Math.random() * 20, peak: 0.55, decay: 0.07 })
    this.tone({ freq: 140 + Math.random() * 40, peak: 0.18, decay: 0.03 })
    this.noiseClick(0.12, 0.01, 2600)
  }

  /** Soft two-note chime when a snippet is completed. */
  playComplete(): void {
    const c = this.ensure()
    if (!c) return
    this.tone({ freq: 880, peak: 0.14, decay: 0.4 })
    this.tone({ freq: 1318.5, peak: 0.14, decay: 0.45, delay: 0.1 })
  }

  /* ---------------- music ---------------- */

  startMusic(): void {
    const c = this.ensure()
    if (!c || this.musicTimer !== null) return
    this.musicOut!.gain.value = this.musicVolume
    this.musicStep = 0
    this.musicTimer = window.setInterval(() => this.musicTick(), 170)
  }

  stopMusic(): void {
    if (this.musicTimer !== null) {
      window.clearInterval(this.musicTimer)
      this.musicTimer = null
    }
    if (this.musicOut) this.musicOut.gain.value = 0
  }

  private musicTick(): void {
    const c = this.ctx
    if (!c || this.musicTimer === null) return
    // A-pentatonic arpeggio walking gently up and down
    const scale = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0]
    const pattern = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 0]
    const index = pattern[this.musicStep % pattern.length]
    const freq = scale[index]
    const delay = 0.005
    const out = this.musicOut

    this.tone({ freq, peak: 0.06, decay: 0.35, delay, out })
    if (this.musicStep % 5 === 0) {
      this.tone({ freq: freq * 2, peak: 0.025, decay: 0.5, delay, out })
    }
    if (this.musicStep % 8 === 0) {
      this.tone({ freq: freq * 3 / 2, peak: 0.02, decay: 0.4, delay, out })
    }
    this.musicStep++
  }
}

export const audio = new AudioEngine()