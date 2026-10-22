import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      // Marks `dep` when Vite transforms it, so a test can tell whether it was inlined.
      name: 'mark-transformed',
      transform(code, id) {
        if (id.includes('/node_modules/dep/')) return code.replace('transformed = false', 'transformed = true');
      },
    },
  ],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'external',
          include: ['external.test.ts'],
          sequence: { groupOrder: 0 },
        },
      },
      {
        extends: true,
        test: {
          name: 'inline',
          include: ['inline.test.ts'],
          server: { deps: { inline: ['dep'] } },
          sequence: { groupOrder: 1 },
        },
      },
    ],
  },
});
