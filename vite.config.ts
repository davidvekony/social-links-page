import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: {
    ignorePatterns: ["dist/**", ".astro/**", ".fallow/**", ".codegraph/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  check: {
    // Keep formatting opt-in: the repo mixes 2- and 4-space indentation.
    fmt: false,
  },
});
