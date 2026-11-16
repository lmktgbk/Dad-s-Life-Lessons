<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project notes

Single App Router app at the repo root (no `src/`). `app/layout.tsx` and `app/page.tsx` are the only routes. The `@/*` alias maps to the repo root (`./*`), not to `app/`.

## Commands

- `npm run dev` (Turbopack), `npm run build`, `npm start`.
- Typecheck: `npx next typegen && npx tsc --noEmit`. Route helpers like `LayoutProps<"/">` come from generated `.next/types`, so typegen must run first. There is no `typecheck` npm script.
- Lint app code with `npx eslint app`. `npm run lint` currently fails on vendored `.agents/skills/design-taste-frontend/**` files (not ignored by `eslint.config.mjs`), so don't treat its exit code as a signal about app changes.
- No test runner is installed.

## Stack quirks

- Next 16.4 with `cacheComponents: true` and `partialPrefetching: true` (`next.config.ts`). Uncached async data in a route blocks prerendering: wrap it in `<Suspense>` or cache it with `"use cache"`. Route segment `runtime` exports are unsupported (Node runtime only). Details: `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md`.
- Tailwind v4 is wired through Turbopack using the `@tailwindcss/turbopack` loader in `next.config.ts`. There is no `tailwind.config.*` or PostCSS config; theme tokens are defined in `app/globals.css` under `@theme inline`.

## Skills

`.agents/skills/` contains installed skills recorded in `skills-lock.json`; don't edit them unless the task is about the skills themselves. `design-taste-frontend` and `frontend-design` apply to UI work; `next-best-practices` is a non-invocable Next.js reference.

## Managed blocks

`next dev` regenerates the blocks above (and a `nextjs-agent-feedback` block, since `experimental.agentFeedback` is on) whenever it detects an agent. Leave them in place and commit them with your changes.
