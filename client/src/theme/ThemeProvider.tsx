import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_THEME, STORAGE_KEY, ThemeContext } from './theme'
import type { Theme, ThemeContextValue } from './theme'

function sanitize(raw: unknown): Theme | null {
  if (typeof raw !== 'object' || raw === null) return null
  const r = raw as Record<string, unknown>
  if (
    typeof r.bg !== 'string' ||
    typeof r.text !== 'string' ||
    typeof r.codeBg !== 'string' ||
    typeof r.accent !== 'string' ||
    typeof r.font !== 'string'
  ) {
    return null
  }
  return { bg: r.bg, text: r.text, codeBg: r.codeBg, accent: r.accent, font: r.font }
}

function loadTheme(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return sanitize(JSON.parse(raw)) ?? DEFAULT_THEME
  } catch {
    // ignore corrupt storage
  }
  return DEFAULT_THEME
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(loadTheme)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
    } catch {
      // storage may be unavailable
    }
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      update: (patch) => setTheme((t) => ({ ...t, ...patch })),
      reset: () => setTheme(DEFAULT_THEME),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
