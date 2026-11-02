import { useEffect, useState } from 'react'

export const DESKTOP_MIN_WIDTH = 768

function detect(): boolean {
  return window.innerWidth >= DESKTOP_MIN_WIDTH
}

/**
 * True when the viewport is large enough to practice typing (desktop /
 * tablet). Below the threshold the app is read-only.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(detect)

  useEffect(() => {
    const onResize = () => setIsDesktop(detect())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return isDesktop
}