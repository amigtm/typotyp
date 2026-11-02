import { createContext } from 'react'

export interface Theme {
  bg: string
  text: string
  codeBg: string
  accent: string
  font: string
}

export interface MonoFont {
  name: string
  stack: string
}

export interface ThemeContextValue {
  theme: Theme
  update: (patch: Partial<Theme>) => void
  reset: () => void
}

export const MONO_FONTS: MonoFont[] = [
  {
    name: 'System',
    stack: "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace",
  },
  {
    name: 'Consolas',
    stack: "Consolas, 'Liberation Mono', Menlo, monospace",
  },
  {
    name: 'Menlo',
    stack: "Menlo, 'DejaVu Sans Mono', Consolas, monospace",
  },
  {
    name: 'Monospace',
    stack: "monospace, 'Courier New', Courier, monospace",
  },
]

export const DEFAULT_THEME: Theme = {
  bg: '#F8F8F8',
  text: '#000000',
  codeBg: '#ffffff',
  accent: '#3b82f6',
  font: MONO_FONTS[0].stack,
}

export const STORAGE_KEY = 'typotyp.theme.v1'

export const ThemeContext = createContext<ThemeContextValue | null>(null)
