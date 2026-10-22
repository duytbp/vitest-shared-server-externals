# Projects sharing a Vite server reuse each other's externalize verdicts

Two inline projects extend the root, so Vitest 5 gives them one Vite server (`sharedViteServer`, on by default). `external` loads `dep` the default way (externalized). `inline` sets `server.deps.inline: ['dep']`. A plugin marks `dep` when Vite transforms it.

```sh
pnpm install
pnpm vitest run
```

Expected: both tests pass. Actual (5.0.5 and 5.1.0-beta.1), with caches cleared (`rm -rf node_modules/.vite node_modules/.vitest-cache`):

| Command | Fails | Why |
| --- | --- | --- |
| `pnpm vitest run` | `inline.test.ts`: expected false to be true | `inline`'s worker gets `external`'s externalize verdict for `dep` (warm externals) |
| `pnpm vitest run --maxWorkers=1 --no-isolate` | `inline.test.ts` | same |
| `pnpm vitest run --maxWorkers=1` | `external.test.ts`: expected true to be false | `external`'s worker gets `inline`'s transformed `dep` (warm modules walk the shared module graph) |

- `pnpm vitest run --project inline` passes.
- `sharedViteServer: false` in the root `test` config passes.
- `sequence.groupOrder` only makes the order deterministic. Without it, the failure depends on which project runs first.
