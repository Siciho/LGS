/// <reference types="vitest" />

import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: "/",
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  server: {
    host: "::",
    port: 8080,
    watch: {
      ignored: ['**/wrapper/**', '**/caches/**', '**/daemon/**', '**/jdks/**']
    }
  },
  optimizeDeps: {
    entries: ['index.html']
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    include: ['src/tests/**/*.test.tsx'],
  },
});