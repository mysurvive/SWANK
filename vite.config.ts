import esbuild from "esbuild";
import fs from "fs-extra";
import path from "path";
import * as Vite from "vite";
import checker from "vite-plugin-checker";
import { viteStaticCopy } from "vite-plugin-static-copy";
// const packageJSON = require("./package.json");

const EN_JSON = JSON.parse(
  fs.readFileSync("./src/static/languages/en.json", { encoding: "utf-8" })
);

// Modeled after pf2e's vite config

const config = Vite.defineConfig(({ command, mode }): Vite.UserConfig => {
  const buildMode = mode === "production" ? "production" : "development";
  const outDir = "dist";

  const plugins = [checker({ typescript: true })];

  if (buildMode === "production") {
    plugins.push(
      {
        name: "minify",
        renderChunk: {
          order: "post",
          async handler(code, chunk) {
            return chunk.fileName.endsWith(".mjs")
              ? esbuild.transform(code, {
                  keepNames: true,
                  minifyIdentifiers: false,
                  minifySyntax: true,
                  minifyWhitespace: true,
                  sourcemap: true,
                })
              : code;
          },
        },
      },
      ...viteStaticCopy({
        targets: [
          { src: "README.md", dest: "." },
          { src: "CHANGELOG.md", dest: "." },
          { src: "LICENSE", dest: "." },
        ],
      })
    );
  } else {
    plugins.push({
      name: "touch-vendor-mjs",
      apply: "build",
      writeBundle: {
        async handler() {
          fs.closeSync(fs.openSync(path.resolve(outDir, "vendor.mjs"), "w"));
        },
      },
    });
  }

  const reEscape = (s: string) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

  return {
    base: command === "build" ? "./" : "/modules/swank/",
    publicDir: "src/static",
    define: {
      BUILD_MODE: JSON.stringify(buildMode),
      EN_JSON: JSON.stringify(EN_JSON),
      fu: "foundry.utils",
    },
    resolve: { tsconfigPaths: true },
    esbuild: { keepNames: true },
    build: {
      outDir,
      emptyOutDir: false,
      minify: false,
      sourcemap: true,
      lib: {
        name: "SWANK",
        entry: "src/module/swank.ts",
        formats: ["es"],
        fileName: "swank",
      },
      rolldownOptions: {
        external: new RegExp(["(?:", reEscape(".webp"), ")$"].join("")),
        output: {
          assetFileNames: "styles/swank.css",
          chunkFileNames: "[name].mjs",
          entryFileNames: "swank.mjs",
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "production";
            }
            return null;
          },
        },
        watch: { buildDelay: 100 },
      },
      target: "es2022",
    },
    server: {
      port: 30000,
      open: "/game",
      proxy: {
        "^(?!/modules/swank/)": "http://localhost:30000/",
        "/socket.io": {
          target: "ws://localhost:30000",
          ws: true,
        },
      },
    },
    plugins,
    css: {
      devSourcemap: buildMode === "development",
    },
  };
});

export default config;
