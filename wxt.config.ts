import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
  outDir: "dist",
  manifest: {
    version: "1.0.1",
    default_locale: "en",
    name: "__MSG_extName__",
    description: "__MSG_extDescription__",
    author: "kai",
  },
});
