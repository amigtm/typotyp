import type { Snippet } from './types'
import { TYPESCRIPT_SNIPPETS } from './typescript'
import { RUST_SNIPPETS } from './rust'
import { C_SNIPPETS } from './c'
import { CPP_SNIPPETS } from './cpp'
import { JAVA_SNIPPETS } from './java'
import { PYTHON_SNIPPETS } from './python'
import { JS_SNIPPETS } from './javascript'
import { ZIG_SNIPPETS } from './zig'
import { CSHARP_SNIPPETS } from './csharp'
import { SWIFT_SNIPPETS } from './swift'
import { KOTLIN_SNIPPETS } from './kotlin'
import { ELIXIR_SNIPPETS } from './elixir'

export interface Language {
  id: string
  label: string
  snippets: Snippet[]
}

export type { Snippet } from './types'

export const LANGUAGES: Language[] = [
  { id: 'typescript', label: 'TypeScript', snippets: TYPESCRIPT_SNIPPETS },
  { id: 'javascript', label: 'JavaScript', snippets: JS_SNIPPETS },
  { id: 'python', label: 'Python', snippets: PYTHON_SNIPPETS },
  { id: 'rust', label: 'Rust', snippets: RUST_SNIPPETS },
  { id: 'c', label: 'C', snippets: C_SNIPPETS },
  { id: 'cpp', label: 'C++', snippets: CPP_SNIPPETS },
  { id: 'java', label: 'Java', snippets: JAVA_SNIPPETS },
  { id: 'zig', label: 'Zig', snippets: ZIG_SNIPPETS },
  { id: 'csharp', label: 'C#', snippets: CSHARP_SNIPPETS },
  { id: 'swift', label: 'Swift', snippets: SWIFT_SNIPPETS },
  { id: 'kotlin', label: 'Kotlin', snippets: KOTLIN_SNIPPETS },
  { id: 'elixir', label: 'Elixir', snippets: ELIXIR_SNIPPETS },
]

export const DEFAULT_LANGUAGE_ID = LANGUAGES[0].id

export function getLanguage(id: string): Language {
  return LANGUAGES.find((l) => l.id === id) ?? LANGUAGES[0]
}