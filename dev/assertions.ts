export function assertNumberEquals<L extends number>(
  value: unknown,
  expected: L,
  message?: string,
): asserts value is L {
  if (typeof value !== 'number' || value != expected) {
    throw new Error(message ?? `Expected ${expected}, got ${String(value)}`);
  }
}
