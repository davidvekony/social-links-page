# AGENTS.md

## Package manager
- Use `pnpm`, not npm or yarn.
- `shamefully-hoist=true` in `.npmrc` is required by Astro. Do not remove.

## Commands
| Command        | Does                               |
| -------------- | ---------------------------------- |
| `pnpm dev`     | Start Astro dev server (port 4321) |
| `pnpm build`   | Production build to `dist/`        |
| `pnpm preview` | Preview the production build       |

No test, lint, or typecheck scripts exist and there is no CI. `pnpm build` is the only verification available. TypeScript is not installed — Astro transpiles TS at build time without type checking (`astro check` would require installing `typescript` + `@astrojs/check`).

## Dependencies
- Node `>=24.15.0`.
- `sharp` must stay a direct dependency: Astro 7 declares it as an *optional peer*, which pnpm never auto-installs. Removing it breaks fresh installs (Docker builds) with `Could not find Sharp` — local builds can still pass because image generation reuses the cache, hiding the breakage.
- `pnpm-workspace.yaml` pins `@ungap/structured-clone` to `1.3.1` to patch CWE-502. Do not remove this override.

## Icons — two systems
- Footer uses `@lucide/astro` components. There is no React anywhere; the React stack (@astrojs/react, react, react-dom) was removed — don't reintroduce it.
- Link icons in `Links.astro`/`Link.astro` are Font Awesome classes (`fa-*`) on `<i>` tags, with a `fa-shake` hover animation added by the inline script in `Link.astro`. Brand icons (GitHub, Bluesky, …) don't exist in lucide — don't convert them.

## shadcn/ui
- Managed by the `shadcn` CLI (`pnpm exec shadcn add <name>`; config in `components.json`). Theme lives in `src/styles/globals.css`; helpers in `src/lib/utils.ts` (`cn()`) and `src/lib/button-variants.ts`.
- `tsconfig.json` is load-bearing: the `@/*` → `src/*` alias is used by imports and resolved by Astro/Vite at build time. Breaking it breaks the build.

## Project structure
- `src/pages/` — routes (file-based routing)
- `src/components/` — Link, Links, Header, Footer
- `src/layouts/` — Layout wrapper
- `src/styles/globals.css` — Tailwind + shadcn theme variables
- `public/` — static assets (favicons); `src/images/` — images optimized by Astro

## Docker / deployment
- Root `Dockerfile`: multi-stage production build (node:24-alpine + corepack pnpm → `pnpm build` → alpine + Caddy file-server on port 80).
- Deploys via Dokploy: clone of `main` + `docker build` — keep `main` buildable; build failures show up only on the next deploy.

## Dev container
- `.devcontainer/` (TypeScript Node 24 + pnpm image). Mounts host `~/.gitconfig` and `~/.config/gh`; requires the `--dns` `runArgs` for networking.
