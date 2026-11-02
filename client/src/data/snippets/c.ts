import type { Snippet } from './types'

export const C_SNIPPETS: Snippet[] = [
  {
    id: 'c-sum',
    title: 'Sum an array',
    description: 'Loops over an int array and accumulates.',
    code: `int sum(int numbers[], int length) {
  int total = 0;
  for (int i = 0; i < length; i++) {
    total += numbers[i];
  }
  return total;
}`,
  },
  {
    id: 'c-fizzbuzz',
    title: 'FizzBuzz',
    description: 'Classic fizzbuzz loop.',
    code: `void fizzbuzz(int n) {
  for (int i = 1; i <= n; i++) {
    if (i % 15 == 0) {
      printf("fizzbuzz\\n");
    } else if (i % 3 == 0) {
      printf("fizz\\n");
    } else if (i % 5 == 0) {
      printf("buzz\\n");
    } else {
      printf("%d\\n", i);
    }
  }
}`,
  },
  {
    id: 'c-clamp',
    title: 'Clamp',
    description: 'Restricts a value to a range.',
    code: `int clamp(int value, int min, int max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}`,
  },
]