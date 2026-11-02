import { useContext } from 'react'
import { SoundContext } from './sound'

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within a SoundProvider')
  return ctx
}

/** Returns true when audio is available in this browser. */
export function soundSupported(): boolean {
  return typeof window.AudioContext !== 'undefined'
}