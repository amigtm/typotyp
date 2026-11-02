import type { Snippet } from './types'

export const JAVA_SNIPPETS: Snippet[] = [
  {
    id: 'java-sum',
    title: 'Sum an array',
    description: 'A stream-based sum over an int array.',
    code: `int sum(int[] numbers) {
  return Arrays.stream(numbers).sum();
}`,
  },
  {
    id: 'java-factorial',
    title: 'Factorial',
    description: 'Recursive factorial with a base case.',
    code: `int factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
  },
  {
    id: 'java-reverse',
    title: 'Reverse a string',
    description: 'Builds a reversed string from a char array.',
    code: `String reverse(String input) {
  char[] chars = input.toCharArray();
  for (int i = 0, j = chars.length - 1; i < j; i++, j--) {
    char tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
  }
  return new String(chars);
}`,
  },
]