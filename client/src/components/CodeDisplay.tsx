import { useMemo } from 'react'
import type { TokenType } from '../lib/tokenizer'

interface CodeDisplayProps {
  code: string
  types: TokenType[]
  caret: number
  errorAt: number | null
  completing: boolean
}

interface Cell {
  ch: string
  index: number
}

/**
 * Renders the target code one character at a time. Committed characters get a
 * "typed" pop, the pending character carries the caret, and mismatched
 * characters flash red. Newlines render as a subtle "↵" marker.
 */
export function CodeDisplay({ code, types, caret, errorAt, completing }: CodeDisplayProps) {
  const lines = useMemo(() => {
    const parts = code.split('\n')
    const result: Cell[][] = []
    let offset = 0
    for (let l = 0; l < parts.length; l++) {
      const part = parts[l]
      const lineCells: Cell[] = []
      for (let j = 0; j < part.length; j++) {
        lineCells.push({ ch: part[j], index: offset + j })
      }
      if (l < parts.length - 1) {
        lineCells.push({ ch: '\n', index: offset + part.length })
      }
      result.push(lineCells)
      offset += part.length + 1
    }
    return result
  }, [code])

  return (
    <div className={`code-display${completing ? ' is-completing' : ''}`} aria-label="code to type">
      {lines.map((cells, lineIndex) => (
        <div className="code-line" key={lineIndex}>
          <span className="line-no">{lineIndex + 1}</span>
          <span className="line-cells">
            {cells.map((cell) => {
              const isTyped = cell.index < caret
              const isCaret = cell.index === caret
              const isError = cell.index === errorAt
              const classes = [
                'char',
                `tok-${types[cell.index] ?? 'plain'}`,
                isTyped ? 'is-typed' : '',
                isCaret ? 'is-caret' : '',
                isError ? 'is-error' : '',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <span key={cell.index} className={classes}>
                  {cell.ch === '\n' ? '\u23CE' : cell.ch === ' ' ? '\u00A0' : cell.ch}
                </span>
              )
            })}
          </span>
        </div>
      ))}
    </div>
  )
}
