import type { Snippet } from './types'

export const KOTLIN_SNIPPETS: Snippet[] = [
  {
    id: 'kt-sum',
    title: 'Sum a list',
    description: 'Sums a list of integers with fold.',
    code: `fun sum(numbers: List<Int>): Int {
  return numbers.fold(0, { total, n -> total + n })
}`,
  },
  {
    id: 'kt-counter',
    title: 'Counter class',
    description: 'A minimal counter class.',
    code: `class Counter(private var count: Int = 0) {
  fun increment() {
    count++
  }

  fun value(): Int = count
}`,
  },
  {
    id: 'kt-fizzbuzz',
    title: 'FizzBuzz',
    description: 'Classic fizzbuzz loop.',
    code: `fun fizzbuzz(n: Int) {
  for (i in 1..n) {
    if (i % 15 == 0) {
      println("fizzbuzz")
    } else if (i % 3 == 0) {
      println("fizz")
    } else if (i % 5 == 0) {
      println("buzz")
    } else {
      println(i)
    }
  }
}`,
  },
]