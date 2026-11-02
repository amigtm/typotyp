import type { Snippet } from './types'

export const RUST_SNIPPETS: Snippet[] = [
  {
    id: 'rs-sum',
    title: 'Sum an array',
    description: 'Folds a slice into its total.',
    code: `fn sum(numbers: &[i32]) -> i32 {
    numbers.fold(0, |acc, n| acc + n)
}`,
  },
  {
    id: 'rs-counter',
    title: 'Counter struct',
    description: 'A tiny counter type with an increment method.',
    code: `struct Counter {
    count: i32,
}

fn increment(mut counter: Counter) -> Counter {
    counter.count += 1
    counter
}`,
  },
  {
    id: 'rs-earliest',
    title: 'Earliest deadline',
    description: 'Picks the smaller deadline between two.',
    code: `fn earliest(a: u64, b: u64) -> u64 {
    if a < b { a } else { b }
}`,
  },
]