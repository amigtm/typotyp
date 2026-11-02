import type { Snippet } from './types'

export const SWIFT_SNIPPETS: Snippet[] = [
  {
    id: 'swift-sum',
    title: 'Sum an array',
    description: 'Reduces an array of Ints to a total.',
    code: `func sum(numbers: [Int]) -> Int {
  return numbers.reduce(0, { total, n in total + n })
}`,
  },
  {
    id: 'swift-counter',
    title: 'Counter struct',
    description: 'A counter value type with an increment method.',
    code: `struct Counter {
  var count: Int

  mutating func increment() {
    count += 1
  }
}`,
  },
  {
    id: 'swift-factorial',
    title: 'Factorial',
    description: 'Recursive factorial with a base case.',
    code: `func factorial(n: Int) -> Int {
  if n <= 1 {
    return 1
  }
  return n * factorial(n - 1)
}`,
  },
]