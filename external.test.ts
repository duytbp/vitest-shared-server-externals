import { expect, test } from 'vitest';
import { transformed } from 'dep';

test('externalizes dep (default)', () => {
  expect(transformed).toBe(false);
});
