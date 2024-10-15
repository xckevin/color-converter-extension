import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  outDir: "dist",
  manifest: {
    version: "1.0.1",
    name: "color-converter",
    description: "A color converter tool",
    author: "kai",
  },
});
