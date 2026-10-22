import { expect, test } from 'vitest';
import { transformed } from 'dep';

test('inlines dep (server.deps.inline)', () => {
  expect(transformed).toBe(true);
});
