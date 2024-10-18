import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import { defaultLocale, locales } from "./src/shared/i18n/";

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  i18n: {
    defaultLocale,
    locales,
  },
  vite: {
    css: {
      modules: {
        localsConvention: "camelCase",
      },
    },
  },
  output: "hybrid",
  adapter: cloudflare({}),
});
