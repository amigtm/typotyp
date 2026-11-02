export interface Snippet {
  id: string
  title: string
  description: string
  language: string
  code: string
}

export const SNIPPETS: Snippet[] = [
  {
    id: 'sum',
    title: 'Sum an array',
    description: 'A tiny reducer that totals an array of numbers.',
    language: 'typescript',
    code: `function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}`,
  },
  {
    id: 'counter',
    title: 'useCounter hook',
    description: 'A small counter hook built on useState.',
    language: 'typescript',
    code: `function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)

  const increment = () => setCount((value) => value + 1)
  const reset = () => setCount(initial)

  return { count, increment, reset }
}`,
  },
  {
    id: 'debounce',
    title: 'Debounce util',
    description: 'Delay a function call until input stops.',
    language: 'typescript',
    code: `function debounce(fn: () => void, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | undefined

  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}`,
  },
]
