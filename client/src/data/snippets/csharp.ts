import type { Snippet } from './types'

export const CSHARP_SNIPPETS: Snippet[] = [
  {
    id: 'cs-sum',
    title: 'Sum a list',
    description: 'Reduces a list of integers to a total.',
    code: `int sum(List<int> numbers) {
  return numbers.stream().mapToInt(n -> n).sum();
}`,
  },
  {
    id: 'cs-counter',
    title: 'Counter class',
    description: 'A minimal counter class.',
    code: `class Counter {
  private int count;

  public Counter(int start) {
    count = start;
  }

  public void increment() {
    count++;
  }

  public int value() {
    return count;
  }
}`,
  },
  {
    id: 'cs-fizzbuzz',
    title: 'FizzBuzz',
    description: 'Classic fizzbuzz loop.',
    code: `void fizzbuzz(int n) {
  for (int i = 1; i <= n; i++) {
    if (i % 15 == 0) {
      System.out.println("fizzbuzz");
    } else if (i % 3 == 0) {
      System.out.println("fizz");
    } else if (i % 5 == 0) {
      System.out.println("buzz");
    } else {
      System.out.println(i);
    }
  }
}`,
  },
]