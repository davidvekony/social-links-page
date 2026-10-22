# Multi-stage build for ultra-minimal production image
FROM ghcr.io/voidzero-dev/vite-plus:1.3.0 AS build
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN vp install --frozen-lockfile
COPY --chown=vp:vp . .
RUN vp run check
RUN vp run build

# Ultra-minimal production stage using a static file server
FROM alpine:latest AS runtime
RUN apk add --no-cache caddy
COPY --from=build /app/dist /srv
EXPOSE 80
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":80"]
