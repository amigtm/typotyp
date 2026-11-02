export type TokenType = 'keyword' | 'string' | 'number' | 'comment' | 'punct' | 'plain'

interface LangSyntax {
  keywords: ReadonlySet<string>
  /** use '#' for line comments (python, elixir, ruby) */
  hashComment?: boolean
  /** use line numbers matching 1-based? no-op, kept for clarity */
  tripleQuote?: boolean
}

const TS_KEYWORDS = new Set([
  'function',
  'const',
  'let',
  'var',
  'return',
  'if',
  'else',
  'for',
  'while',
  'do',
  'switch',
  'case',
  'default',
  'break',
  'continue',
  'new',
  'class',
  'interface',
  'type',
  'extends',
  'implements',
  'export',
  'import',
  'from',
  'as',
  'async',
  'await',
  'yield',
  'try',
  'catch',
  'finally',
  'throw',
  'typeof',
  'instanceof',
  'in',
  'of',
  'this',
  'super',
  'null',
  'undefined',
  'true',
  'false',
  'void',
  'number',
  'string',
  'boolean',
  'object',
  'unknown',
  'any',
])

export const LANG_SYNTAX: Record<string, LangSyntax> = {
  typescript: { keywords: TS_KEYWORDS },
  javascript: { keywords: TS_KEYWORDS },
  python: {
    keywords: new Set([
      'def',
      'class',
      'return',
      'if',
      'elif',
      'else',
      'for',
      'while',
      'import',
      'from',
      'as',
      'try',
      'except',
      'finally',
      'raise',
      'with',
      'lambda',
      'pass',
      'break',
      'continue',
      'yield',
      'global',
      'nonlocal',
      'in',
      'is',
      'not',
      'and',
      'or',
      'None',
      'True',
      'False',
      'self',
      'async',
      'await',
    ]),
    hashComment: true,
    tripleQuote: true,
  },
  rust: {
    keywords: new Set([
      'fn',
      'let',
      'const',
      'mut',
      'return',
      'if',
      'else',
      'for',
      'while',
      'loop',
      'match',
      'break',
      'continue',
      'struct',
      'enum',
      'trait',
      'impl',
      'mod',
      'pub',
      'use',
      'crate',
      'self',
      'move',
      'as',
      'where',
      'async',
      'await',
      'true',
      'false',
      'i32',
      'i64',
      'u8',
      'u16',
      'u32',
      'u64',
      'usize',
      'f32',
      'f64',
    ]),
  },
  c: {
    keywords: new Set([
      'int',
      'char',
      'float',
      'double',
      'void',
      'long',
      'short',
      'unsigned',
      'signed',
      'struct',
      'enum',
      'union',
      'typedef',
      'return',
      'if',
      'else',
      'for',
      'while',
      'do',
      'switch',
      'case',
      'default',
      'break',
      'continue',
      'sizeof',
      'static',
      'const',
      'goto',
    ]),
  },
  cpp: {
    keywords: new Set([
      'int',
      'char',
      'float',
      'double',
      'void',
      'long',
      'bool',
      'class',
      'struct',
      'enum',
      'template',
      'typedef',
      'namespace',
      'using',
      'return',
      'if',
      'else',
      'for',
      'while',
      'do',
      'switch',
      'case',
      'default',
      'break',
      'continue',
      'new',
      'delete',
      'this',
      'true',
      'false',
      'nullptr',
      'const',
      'static',
      'public',
      'private',
      'protected',
      'throw',
      'catch',
      'try',
      'import',
      'export',
    ]),
  },
  java: {
    keywords: new Set([
      'public',
      'private',
      'protected',
      'static',
      'final',
      'void',
      'int',
      'long',
      'float',
      'double',
      'boolean',
      'char',
      'byte',
      'short',
      'class',
      'interface',
      'extends',
      'implements',
      'return',
      'if',
      'else',
      'for',
      'while',
      'do',
      'switch',
      'case',
      'default',
      'break',
      'continue',
      'new',
      'this',
      'super',
      'null',
      'true',
      'false',
      'try',
      'catch',
      'finally',
      'throw',
      'throws',
      'import',
      'package',
      'instanceof',
      'var',
      'String',
      'Integer',
      'List',
      'Array',
    ]),
  },
  zig: {
    keywords: new Set([
      'fn',
      'var',
      'const',
      'return',
      'if',
      'else',
      'for',
      'while',
      'defer',
      'switch',
      'case',
      'break',
      'continue',
      'struct',
      'enum',
      'union',
      'errdefer',
      'pub',
      'import',
      'try',
      'catch',
      'error',
      'anyerror',
      'comptime',
      'usize',
      'isize',
      'u8',
      'u16',
      'u32',
      'u64',
      'i8',
      'i16',
      'i32',
      'i64',
      'f32',
      'f64',
      'true',
      'false',
      'null',
    ]),
  },
  csharp: {
    keywords: new Set([
      'public',
      'private',
      'protected',
      'static',
      'final',
      'void',
      'int',
      'long',
      'float',
      'double',
      'boolean',
      'char',
      'byte',
      'short',
      'class',
      'interface',
      'extends',
      'implements',
      'return',
      'if',
      'else',
      'for',
      'foreach',
      'while',
      'do',
      'switch',
      'case',
      'default',
      'break',
      'continue',
      'new',
      'this',
      'super',
      'null',
      'true',
      'false',
      'try',
      'catch',
      'finally',
      'throw',
      'import',
      'package',
      'var',
      'lambda',
      'Record',
      'List',
      'String',
      'Int',
    ]),
  },
  swift: {
    keywords: new Set([
      'func',
      'return',
      'if',
      'else',
      'for',
      'while',
      'repeat',
      'switch',
      'case',
      'default',
      'break',
      'continue',
      'struct',
      'class',
      'enum',
      'protocol',
      'extension',
      'import',
      'public',
      'private',
      'internal',
      'static',
      'final',
      'var',
      'let',
      'const',
      'true',
      'false',
      'nil',
      'self',
      'in',
      'is',
      'as',
      'mutating',
      'nonmutating',
      'where',
      'Int',
      'String',
      'Double',
      'Bool',
      'Array',
    ]),
  },
  kotlin: {
    keywords: new Set([
      'fun',
      'return',
      'if',
      'else',
      'for',
      'while',
      'do',
      'switch',
      'case',
      'default',
      'break',
      'continue',
      'class',
      'struct',
      'enum',
      'interface',
      'extension',
      'import',
      'public',
      'private',
      'protected',
      'internal',
      'static',
      'final',
      'var',
      'val',
      'let',
      'true',
      'false',
      'null',
      'this',
      'super',
      'self',
      'in',
      'is',
      'as',
      'where',
      'Int',
      'String',
      'Double',
      'Bool',
      'Double',
      'List',
    ]),
  },
  elixir: {
    keywords: new Set([
      'def',
      'defp',
      'defmodule',
      'defstruct',
      'do',
      'end',
      'if',
      'else',
      'unless',
      'case',
      'cond',
      'fun',
      'fn',
      'true',
      'false',
      'nil',
      'when',
      'receive',
      'after',
      'try',
      'rescue',
      'catch',
      'raise',
      'throw',
      'import',
      'require',
      'alias',
      'module',
      'function',
    ]),
    hashComment: true,
  },
}

export const DEFAULT_LANG_ID = 'typescript'

const IDENT_START = /[A-Za-z_$]/
const IDENT_CHAR = /[A-Za-z0-9_$]/

function isDigit(c: string): boolean {
  return c >= '0' && c <= '9'
}

function getSyntax(langId: string): LangSyntax {
  return LANG_SYNTAX[langId] ?? LANG_SYNTAX[DEFAULT_LANG_ID]
}

/**
 * Splits a source string into per-character token types.
 * `types[i]` describes the character at `code[i]`.
 */
export function tokenize(code: string, langId: string = DEFAULT_LANG_ID): TokenType[] {
  const { keywords, hashComment, tripleQuote } = getSyntax(langId)
  const types: TokenType[] = new Array(code.length).fill('plain')
  let i = 0
  const n = code.length

  const mark = (start: number, end: number, type: TokenType) => {
    for (let k = start; k < end; k++) types[k] = type
  }

  // triple-quoted strings (python) come before regular quotes
  const tryTriple = (quote: string, startIndex: number): boolean => {
    if (!tripleQuote) return false
    if (code.slice(startIndex, startIndex + 3) !== quote.repeat(3)) return false
    const start = startIndex
    let k = startIndex + 3
    while (k + 2 < n && code.slice(k, k + 3) !== quote.repeat(3)) {
      if (code[k] === '\\') {
        k += 2
        continue
      }
      k++
    }
    k = Math.min(n, k + 3)
    mark(start, k, 'string')
    i = k
    return true
  }

  while (i < n) {
    const ch = code[i]

    if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '\r') {
      i++
      continue
    }

    // nested triple quotes first
    if ((ch === '"' || ch === "'") && tryTriple(ch, i)) continue

    // line comment
    if (hashComment && ch === '#') {
      const start = i
      while (i < n && code[i] !== '\n') i++
      mark(start, i, 'comment')
      continue
    }
    if (ch === '/' && code[i + 1] === '/') {
      const start = i
      while (i < n && code[i] !== '\n') i++
      mark(start, i, 'comment')
      continue
    }

    // block comment
    if (ch === '/' && code[i + 1] === '*') {
      const start = i
      i += 2
      while (i < n && !(code[i] === '*' && code[i + 1] === '/')) i++
      i = Math.min(n, i + 2)
      mark(start, i, 'comment')
      continue
    }

    // string literal
    if (ch === "'" || ch === '"' || ch === '`') {
      const start = i
      const quote = ch
      i++
      while (i < n) {
        if (code[i] === '\\') {
          i += 2
          continue
        }
        if (code[i] === quote) {
          i++
          break
        }
        i++
      }
      mark(start, i, 'string')
      continue
    }

    // number
    if (isDigit(ch) || (ch === '.' && isDigit(code[i + 1] ?? ''))) {
      const start = i
      while (i < n && /[0-9a-zA-Z_.]/.test(code[i])) i++
      mark(start, i, 'number')
      continue
    }

    // identifier or keyword
    if (IDENT_START.test(ch)) {
      const start = i
      while (i < n && IDENT_CHAR.test(code[i])) i++
      const word = code.slice(start, i)
      mark(start, i, keywords.has(word) ? 'keyword' : 'plain')
      continue
    }

    // punctuation / operators
    mark(i, i + 1, 'punct')
    i++
  }

  return types
}