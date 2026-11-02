import type { Snippet } from './types'

export const TYPESCRIPT_SNIPPETS: Snippet[] = [
  {
    id: 'ts-sum',
    title: 'Sum an array',
    description: 'A tiny reducer that totals an array of numbers.',
    code: `function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}`,
  },
  {
    id: 'ts-counter',
    title: 'useCounter hook',
    description: 'A small counter hook built on useState.',
    code: `function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)

  const increment = () => setCount((value) => value + 1)
  const reset = () => setCount(initial)

  return { count, increment, reset }
}`,
  },
  {
    id: 'ts-debounce',
    title: 'Debounce util',
    description: 'Delay a function call until input stops.',
    code: `function debounce(fn: () => void, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | undefined

  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}`,
  },
]