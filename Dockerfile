FROM node:lts AS base
WORKDIR /app

# Copy only the package.json and pnpm-lock.yaml to leverage Docker's caching
COPY repo/package.json repo/pnpm-lock.yaml ./

RUN npm i -g pnpm

FROM base AS deps
RUN pnpm install --prod

FROM base AS build
# Copy the rest of the application code
COPY repo/. .
# Install development dependencies for the build process
RUN pnpm install
RUN pnpm run build

FROM httpd:2.4 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80