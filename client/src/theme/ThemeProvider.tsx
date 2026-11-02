import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_THEME, getFont, STORAGE_KEY, ThemeContext } from './theme'
import type { MonoFont, Theme, ThemeContextValue } from './theme'

function sanitize(raw: unknown): Theme | null {
  if (typeof raw !== 'object' || raw === null) return null
  const r = raw as Record<string, unknown>
  if (
    typeof r.bg !== 'string' ||
    typeof r.text !== 'string' ||
    typeof r.codeBg !== 'string' ||
    typeof r.accent !== 'string' ||
    typeof r.fontId !== 'string'
  ) {
    return null
  }
  return {
    bg: r.bg,
    text: r.text,
    codeBg: r.codeBg,
    accent: r.accent,
    fontId: getFont(r.fontId).id,
  }
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

  // Load the selected coding font from Google Fonts (webfont) and attach the
  // stylesheet to the document head.
  const font: MonoFont = getFont(theme.fontId)
  useEffect(() => {
    const parent = document.head ?? document.documentElement
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = font.url
    parent.appendChild(link)
    return () => {
      parent.removeChild(link)
    }
  }, [font.url])

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