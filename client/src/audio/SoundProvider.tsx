import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { audio } from './engine'
import { DEFAULT_SOUND, SoundContext } from './sound'
import type { SoundContextValue, SoundPrefs } from './sound'

const STORAGE_KEY = 'typotyp.sound.v1'

function clamp01(raw: unknown): number | null {
  if (typeof raw !== 'number') return null
  if (raw !== raw) return null // NaN
  return Math.min(1, Math.max(0, raw))
}

function sanitize(raw: unknown): SoundPrefs | null {
  if (typeof raw !== 'object' || raw === null) return null
  const r = raw as Record<string, unknown>
  if (typeof r.keySounds !== 'boolean' || typeof r.music !== 'boolean') return null
  const keyVolume = clamp01(r.keyVolume)
  const musicVolume = clamp01(r.musicVolume)
  if (keyVolume === null || musicVolume === null) return null
  return {
    keySounds: r.keySounds,
    keyVolume,
    music: r.music,
    musicVolume,
  }
}

function loadSound(): SoundPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return sanitize(JSON.parse(raw)) ?? DEFAULT_SOUND
  } catch {
    // ignore corrupt storage
  }
  return DEFAULT_SOUND
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<SoundPrefs>(loadSound)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      // storage may be unavailable
    }
  }, [prefs])

  useEffect(() => {
    audio.setSfxVolume(prefs.keyVolume)
  }, [prefs.keyVolume])

  useEffect(() => {
    audio.setMusicVolume(prefs.musicVolume)
    if (prefs.music) {
      audio.startMusic()
    } else {
      audio.stopMusic()
    }
  }, [prefs.music, prefs.musicVolume])

  const value = useMemo<SoundContextValue>(
    () => ({
      prefs,
      update: (patch) => setPrefs((p) => ({ ...p, ...patch })),
      reset: () => setPrefs(DEFAULT_SOUND),
      playKey: () => {
        if (prefs.keySounds) audio.playKey()
      },
      playError: () => {
        if (prefs.keySounds) audio.playError()
      },
      playComplete: () => {
        if (prefs.keySounds) audio.playComplete()
      },
    }),
    [prefs],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}