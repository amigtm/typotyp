import { createContext } from 'react'

export interface SoundPrefs {
  keySounds: boolean
  keyVolume: number
  music: boolean
  musicVolume: number
}

export const DEFAULT_SOUND: SoundPrefs = {
  keySounds: true,
  keyVolume: 0.7,
  music: false,
  musicVolume: 0.25,
}

export interface SoundContextValue {
  prefs: SoundPrefs
  update: (patch: Partial<SoundPrefs>) => void
  reset: () => void
  /** Plays a mechanical clack for a keypress (no-op when disabled). */
  playKey: () => void
  /** Plays an error thud (no-op when disabled). */
  playError: () => void
  /** Plays a completion chime (no-op when disabled). */
  playComplete: () => void
}

export const SoundContext = createContext<SoundContextValue | null>(null)