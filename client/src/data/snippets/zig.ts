import type { Snippet } from './types'

export const ZIG_SNIPPETS: Snippet[] = [
  {
    id: 'zig-sum',
    title: 'Sum an array',
    description: 'Iterates a slice and accumulates the total.',
    code: `fn sum(numbers: []i32) i32 {
    var total: i32 = 0;
    for (n: numbers) {
        total += n;
    }
    return total;
}`,
  },
  {
    id: 'zig-clamp',
    title: 'Clamp',
    description: 'Restricts a value to a range.',
    code: `fn clamp(value: i32, min: i32, max: i32) i32 {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}`,
  },
  {
    id: 'zig-swap',
    title: 'Swap values',
    description: 'Swaps two integers in place.',
    code: `fn swap(a: *i32, b: *i32) void {
    const tmp = a.*;
    a.* = b.*;
    b.* = tmp;
}`,
  },
]