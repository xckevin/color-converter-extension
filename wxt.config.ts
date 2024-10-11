import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    version: '1.0.0',
    name: 'color-converter',
    description: 'A color converter tool',    
    author: 'kai',
  }
});
