import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'node:path';

/**
 * Nx + Vite:
 * - `root: __dirname` makes Vite serve this app's index.html (prevents `/` = 404)
 * - `tsconfigPaths({ projects: [...] })` makes Vite resolve workspace path aliases like `@shared/*`
 */
export default defineConfig({
  root: __dirname,
  plugins: [
    react(),
    tsconfigPaths({
      projects: [path.resolve(__dirname, '../../tsconfig.base.json')]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: { port: 5174 },
  build: {
    outDir: '../../dist/apps/admin-ui',
    emptyOutDir: true
  }
});
