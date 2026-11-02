export type TokenType = 'keyword' | 'string' | 'number' | 'comment' | 'punct' | 'plain'

const KEYWORDS = new Set([
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

const IDENT_START = /[A-Za-z_$]/
const IDENT_CHAR = /[A-Za-z0-9_$]/

function isDigit(c: string): boolean {
  return c >= '0' && c <= '9'
}

/**
 * Splits a source string into per-character token types.
 * `types[i]` describes the character at `code[i]`.
 */
export function tokenize(code: string): TokenType[] {
  const types: TokenType[] = new Array(code.length).fill('plain')
  let i = 0
  const n = code.length

  const mark = (start: number, end: number, type: TokenType) => {
    for (let k = start; k < end; k++) types[k] = type
  }

  while (i < n) {
    const ch = code[i]

    if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '\r') {
      i++
      continue
    }

    // line comment
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

    // string literal (single, double, or backtick)
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
      mark(start, i, KEYWORDS.has(word) ? 'keyword' : 'plain')
      continue
    }

    // punctuation / operators
    mark(i, i + 1, 'punct')
    i++
  }

  return types
}
