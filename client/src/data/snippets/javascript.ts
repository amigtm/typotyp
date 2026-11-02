import type { Snippet } from './types'

export const JS_SNIPPETS: Snippet[] = [
  {
    id: 'js-sum',
    title: 'Sum an array',
    description: 'Reduce an array of numbers to a total.',
    code: `function sum(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}`,
  },
  {
    id: 'js-counter',
    title: 'Counter factory',
    description: 'A closure that captures and mutates state.',
    code: `function createCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    value: () => count,
  };
}`,
  },
  {
    id: 'js-debounce',
    title: 'Debounce util',
    description: 'Delay a callback until input stops.',
    code: `function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
  },
]