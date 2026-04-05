import { describe, expect, it } from 'vitest';

const example1 = 1;
const example2 = 2;
const example3 = 3;

describe('sum test', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(example1 + example2).toBe(example3);
  });
});
