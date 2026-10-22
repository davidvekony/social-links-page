<div align="center">
  <img src="public/favicons/android-chrome-512x512.png" width="80" alt="social-links-page icon">
  <h1>social-links-page</h1>
  <p>A personal links page built with Astro.</p>
</div>

## What's inside

The page shows a profile photo, a name, and a list of social links: Bluesky, GitHub, Instagram, LinkedIn, Mastodon, Threads, and Buy Me A Coffee. Each link is a button with a Font Awesome brand icon that shakes on hover.

It is a single static page. The tech stack:

- [Astro 7](https://astro.build/) with file-based routing and static output
- [Tailwind CSS 4](https://tailwindcss.com/) with shadcn-style theme variables
- Font Awesome kit for brand icons; [lucide](https://lucide.dev/) for footer icons
- Profile image optimized by `astro:assets` (`sharp`)
- DM Sans from Google Fonts

## Getting started

Requirements: Node `^24.15.0 || >=26.0.0` and [Vite+](https://viteplus.dev/) with the global `vp` CLI (`curl -fsSL https://vite.plus | bash`). The project pins its own Vite+ toolchain in `devDependencies`, so `vp` picks it up automatically.

```bash
vp install
```

| Command            | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `vp run dev`       | Start the Astro dev server on port 4321                      |
| `vp run build`     | Production build to `dist/`                                  |
| `vp run preview`   | Preview the production build                                 |
| `vp run lint`      | Lint with Oxlint through Vite+                               |
| `vp run typecheck` | Type-check TypeScript (tsgolint) and `.astro` files (`astro check`) |
| `vp run check`     | Lint + type-check in one command                             |
| `vp run format`    | Format with Oxfmt (opt-in; not enforced by `check`)          |

If you don't have the global `vp` CLI, run the same commands through pnpm: install once with `pnpm install`, then `pnpm exec vp <command>` (e.g. `pnpm exec vp run build`).

> [!NOTE]
> `.npmrc` sets `shamefully-hoist=true`, which Astro requires for pnpm installs. Do not remove it — Vite+ drives pnpm underneath.

> [!NOTE]
> `pnpm-workspace.yaml` aliases `vite` to `@voidzero-dev/vite-plus-core@1.3.0` so the Astro toolchain and Vite+ share one Vite copy. It also pins `vitest` to `5.0.5`, the version bundled with Vite+ 1.3.0. The resulting pnpm "unmet peer vite" warning is expected: the core reports its own 1.3.0 version while peers request Vite semver ranges.

> [!IMPORTANT]
> `sharp` is a direct dependency on purpose. Astro declares it as an optional peer, so pnpm never auto-installs it, and fresh installs would fail image generation without it.

## Project structure

```text
src/
├── components/   # Link, Links, Header, Footer
├── images/       # Images optimized by Astro
├── layouts/      # Layout wrapper
├── lib/          # cn() and buttonVariants helpers
├── pages/        # Routes
└── styles/       # globals.css: Tailwind + shadcn theme variables
public/           # Static assets (favicons)
```

## Docker

The `Dockerfile` runs a multi-stage build: `vp install`, `vp run check`, and `vp run build` on the official `ghcr.io/voidzero-dev/vite-plus:1.3.0` image, then `dist/` is served by Caddy on port 80.

```bash
docker build -t social-links-page .
docker run -p 80:80 social-links-page
```

> [!WARNING]
> `pnpm-workspace.yaml` overrides `@ungap/structured-clone` to `1.3.1` to patch CWE-502. Do not remove this override.
