import type { Snippet } from './types'

export const ELIXIR_SNIPPETS: Snippet[] = [
  {
    id: 'ex-sum',
    title: 'Sum a list',
    description: 'Reduces a list of integers to a total.',
    code: `def sum(numbers) do
  Enum.reduce(numbers, 0, fn total, n -> total + n end)
end`,
  },
  {
    id: 'ex-double',
    title: 'Double list',
    description: 'Maps each item to its doubled value.',
    code: `def double(numbers) do
  Enum.map(numbers, fn n -> n * 2 end)
end`,
  },
  {
    id: 'ex-even',
    title: 'Keep evens',
    description: 'Filters a list down to even numbers.',
    code: `def keep_evens(numbers) do
  Enum.filter(numbers, fn n -> rem(n, 2) == 0 end)
end`,
  },
]