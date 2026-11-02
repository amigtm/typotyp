import type { Snippet } from './types'

export const CPP_SNIPPETS: Snippet[] = [
  {
    id: 'cpp-sum',
    title: 'Sum a vector',
    description: 'Accumulates a std::vector with a for-each loop.',
    code: `int sum(const std::vector<int>& numbers) {
  int total = 0;
  for (const int n : numbers) {
    total += n;
  }
  return total;
}`,
  },
  {
    id: 'cpp-counter',
    title: 'Counter class',
    description: 'A minimal counter class.',
    code: `class Counter {
public:
  Counter(int start = 0) : count(start) {}

  void increment() { count++; }
  int value() const { return count; }

private:
  int count;
};`,
  },
  {
    id: 'cpp-swap',
    title: 'Swap values',
    description: 'Swaps two integers in place.',
    code: `void swap(int& a, int& b) {
  int tmp = a;
  a = b;
  b = tmp;
}`,
  },
]