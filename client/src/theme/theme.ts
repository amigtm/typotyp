import { createContext } from 'react'

export interface Theme {
  bg: string
  text: string
  codeBg: string
  accent: string
  /** id of the selected MonoFont entry */
  fontId: string
}

export interface MonoFont {
  id: string
  name: string
  /** CSS font-family name used after the Google Fonts stylesheet loads */
  family: string
  /** Google Fonts css2 stylesheet URL (webfont, no local install needed) */
  url: string
  /** fallback stack in case the webfont fails to load */
  fallback: string
}

function gf(family: string, weights: string): MonoFont {
  const cssFamily = family.replace(/ /g, '+')
  return {
    id: family.toLowerCase().replace(/ /g, '-'),
    name: family,
    family,
    url: `https://fonts.googleapis.com/css2?family=${cssFamily}:wght@${weights}&display=swap`,
    fallback: "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace",
  }
}

export const MONO_FONTS: MonoFont[] = [
  gf('JetBrains Mono', '400;500;600;700'),
  gf('Fira Code', '400;500;600;700'),
  gf('IBM Plex Mono', '400;500;700'),
  gf('Cascadia Code', '200;300;400;500;600;700'),
  gf('Victor Mono', '100;200;300;400;500;600;700'),
  gf('Roboto Mono', '400;500;700'),
  gf('Source Code Pro', '400;500;700'),
  gf('Space Mono', '400;500'),
  gf('Ubuntu Mono', '400'),
]

export const DEFAULT_FONT_ID = MONO_FONTS[0].id

export interface ThemeContextValue {
  theme: Theme
  update: (patch: Partial<Theme>) => void
  reset: () => void
}

export const DEFAULT_THEME: Theme = {
  bg: '#F8F8F8',
  text: '#000000',
  codeBg: '#ffffff',
  accent: '#3b82f6',
  fontId: DEFAULT_FONT_ID,
}

export const STORAGE_KEY = 'typotyp.theme.v1'

export interface ThemePreset {
  id: string
  name: string
  theme: Theme
}

/** Color presets (bring-your-own colors stay available via the pickers). */
export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'dracula',
    name: 'Dracula',
    theme: {
      bg: '#282a36',
      text: '#f8f8f2',
      codeBg: '#21222c',
      accent: '#bd93f9',
      fontId: DEFAULT_FONT_ID,
    },
  },
  {
    id: 'one-dark',
    name: 'One Dark Pro',
    theme: {
      bg: '#282c34',
      text: '#abb2bf',
      codeBg: '#21252b',
      accent: '#61afef',
      fontId: DEFAULT_FONT_ID,
    },
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    theme: {
      bg: '#1a1b26',
      text: '#c0caf5',
      codeBg: '#16161e',
      accent: '#7aa2f7',
      fontId: DEFAULT_FONT_ID,
    },
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    theme: {
      bg: '#1e1e2e',
      text: '#cdd6f4',
      codeBg: '#181825',
      accent: '#cba6f7',
      fontId: DEFAULT_FONT_ID,
    },
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    theme: {
      bg: '#011627',
      text: '#d6deeb',
      codeBg: '#01111d',
      accent: '#82aaff',
      fontId: DEFAULT_FONT_ID,
    },
  },
  {
    id: 'matcha',
    name: 'Matcha',
    theme: {
      bg: '#eef4e6',
      text: '#2f3b2f',
      codeBg: '#e6efdb',
      accent: '#6a9b54',
      fontId: DEFAULT_FONT_ID,
    },
  },
]

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function getFont(id: string): MonoFont {
  return MONO_FONTS.find((f) => f.id === id) ?? MONO_FONTS[0]
}