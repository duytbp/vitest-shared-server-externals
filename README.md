# Projects sharing a Vite server reuse each other's externalize verdicts

Two inline projects extend the root, so Vitest 5 gives them one Vite server (`sharedViteServer`, on by default). `external` loads `dep` the default way (externalized). `inline` sets `server.deps.inline: ['dep']`. A plugin marks `dep` when Vite transforms it.

```sh
pnpm install
pnpm test
```

Expected: both tests pass. Actual (5.0.5 and 5.1.0-beta.1): `inline.test.ts` fails with `expected false to be true`, because `inline`'s worker gets `external`'s verdict for `dep` and loads it untransformed.

- `pnpm vitest run --project inline` passes.
- `sharedViteServer: false` in the root `test` config passes.
- `sequence.groupOrder` only makes the order deterministic. Without it, the failure depends on which project runs first.
