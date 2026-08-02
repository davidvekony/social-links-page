# AGENTS.md

## Package manager
- Use `pnpm`, not npm or yarn.
- `shamefully-hoist=true` in `.npmrc` is required by Astro. Do not remove.

## Commands
| Command           | Does                                        |
| ----------------- | ------------------------------------------- |
| `pnpm dev`        | Start Astro dev server (port 4321)          |
| `pnpm build`      | Production build to `dist/`                 |
| `pnpm preview`    | Preview the production build                |

No test, lint, or typecheck scripts exist. There is no CI.

## Dependencies
- Node `>=24.15.0`
- Astro `^7.1.6` (not the only direct dependency — see `package.json` for the full list: @astrojs/react, tailwindcss, lucide-react, and others)

## Dependency override
`pnpm-workspace.yaml` pins `@ungap/structured-clone` to `1.3.1` to patch CWE-502.
Do not remove this override.

## Project structure
- `src/pages/` — route entrypoints (standard Astro file-based routing)
- `src/components/` — reusable Astro components (Link, Header, Footer, Links)
- `src/layouts/` — page layout wrappers
- `public/` — static assets served as-is (favicons)
- `src/images/` — images imported/bundled by Astro

## Docker
- Root `Dockerfile` is a multi-stage production build (Astro build → Apache httpd).
- `.devcontainer/` is the development container (TypeScript Node 24 + pnpm).
- Dev container mounts host `.gitconfig` and `gh` CLI config; requires `runArgs` DNS settings for networking.
