import type { Snippet } from './types'

export const PYTHON_SNIPPETS: Snippet[] = [
  {
    id: 'py-sum',
    title: 'Sum numbers',
    description: 'Totals an iterable with the built-in sum.',
    code: `def sum_numbers(numbers):
    return sum(numbers)`,
  },
  {
    id: 'py-counter',
    title: 'Counter dict',
    description: 'Counts occurrences of each item.',
    code: `def count_items(items):
    counts = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1
    return counts`,
  },
  {
    id: 'py-debounce',
    title: 'Debounce',
    description: 'Defers a call until input stops.',
    code: `def debounce(fn, delay=0.3):
    timer = {"handle": None}

    def call(*args, **kwargs):
        if timer["handle"] is not None:
            timer["handle"].cancel()
        timer["handle"] = threading.Timer(delay, fn, args, kwargs)
        timer["handle"].daemon = True
        timer["handle"].start()

    return call`,
  },
]