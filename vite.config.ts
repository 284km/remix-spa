import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { copyFileSync } from "node:fs";
import { join } from "node:path";

export default defineConfig({
  base: "/remix-spa/",
  plugins: [
    remix({
      ssr: false,
      basename: "/remix-spa/",
      buildEnd(args) {
        if (!args.viteConfig.isProduction) return;

        const buildPath = args.viteConfig.build.outDir;
        copyFileSync(
          join(buildPath, "index.html"),
          join(buildPath, "404.html"),
        );
      }
    }),
    tsconfigPaths(),
  ],
});
