# AGENTS.md

## Package manager
- Vite+ (`vp`) is the single entry point; it drives pnpm underneath. Use `vp install`/`vp run <script>`; direct pnpm also works (`pnpm exec vp ...`) but `vp` is the documented front door.
- `shamefully-hoist=true` in `.npmrc` is required by Astro. Do not remove.

## Commands
| Command            | Does                                              |
| ------------------ | ------------------------------------------------- |
| `vp run dev`       | Start Astro dev server (port 4321)                |
| `vp run build`     | Production build to `dist/`                       |
| `vp run preview`   | Preview the production build                      |
| `vp run lint`      | Lint with Oxlint through Vite+                    |
| `vp run typecheck` | Type-check TS (tsgolint) and `.astro` (`astro check`) |
| `vp run check`     | Lint + type-check in one command                  |
| `vp run format`    | Format with Oxfmt (opt-in; `check.fmt` is false)  |

There is no test suite and no CI. Verification: `vp run check` plus `vp run build` (a Docker build additionally proves deploy parity).

Note: `astro check` covers `.astro` templates; Vite+ (= Oxlint + tsgolint) only lints `<script>` blocks inside `.astro` files, so both are needed for full coverage.

## Dependencies
- Node `^24.15.0 || >=26.0.0` (Vite+ 1.3.0 excludes Node 25).
- Vite+ is pinned in `devDependencies` (`vite-plus@1.3.0`); the global `vp` CLI delegates to it inside this project.
- `pnpm-workspace.yaml` (pnpm 12 reads overrides only there — `package.json#overrides` is ignored):
  - aliases `vite` to `@voidzero-dev/vite-plus-core@1.3.0`;
  - pins `vitest` to `5.0.5`, the version bundled with Vite+ 1.3.0, so any transitive Vitest matches the toolchain;
  - pins `@ungap/structured-clone` to `1.3.1` to patch CWE-502. Do not remove this override.
  - The pnpm "unmet peer vite" warning is expected: the core reports version 1.3.0 while peers request Vite semver ranges.
- `tsconfig.json` has no `baseUrl`: tsgolint (TypeScript 7) rejects it. The `#/*` → `./src/*` paths alias works without it.
- `sharp` must stay a direct dependency: Astro 7 declares it as an *optional peer*, which pnpm never auto-installs. Removing it breaks fresh installs (Docker builds) with `Could not find Sharp` — local builds can still pass because image generation reuses the cache, hiding the breakage.

## Icons — two systems
- Footer uses `@lucide/astro` components. There is no React anywhere; the React stack (@astrojs/react, react, react-dom) was removed — don't reintroduce it.
- Link icons in `Links.astro`/`Link.astro` are Font Awesome classes (`fa-*`) on `<i>` tags, with a `fa-shake` hover animation added by the inline script in `Link.astro`. Brand icons (GitHub, Bluesky, …) don't exist in lucide — don't convert them.

## shadcn/ui
- Managed by the `shadcn` CLI (`pnpm exec shadcn add <name>`; config in `components.json`). Theme lives in `src/styles/globals.css`; helpers in `src/lib/utils.ts` (`cn()`) and `src/lib/button-variants.ts`.
- `tsconfig.json` is load-bearing: the `#/*` → `./src/*` alias is used by imports and resolved by Astro/Vite at build time. Breaking it breaks the build.

## Project structure
- `src/pages/` — routes (file-based routing)
- `src/components/` — Link, Links, Header, Footer
- `src/layouts/` — Layout wrapper
- `src/styles/globals.css` — Tailwind + shadcn theme variables
- `public/` — static assets (favicons); `src/images/` — images optimized by Astro

## Docker / deployment
- Root `Dockerfile`: multi-stage production build (`ghcr.io/voidzero-dev/vite-plus:1.3.0` running `vp install --frozen-lockfile`, `vp run check`, `vp run build` → alpine + Caddy file-server on port 80).
- The Vite+ image runs as non-root `vp:vp`; `WORKDIR` creates `/app` owned by that user, and `COPY --chown=vp:vp` keeps copied files writable by it.
- Deploys via Dokploy: clone of `main` + `docker build` — keep `main` buildable; build failures show up only on the next deploy.
