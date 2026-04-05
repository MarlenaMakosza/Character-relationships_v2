import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@test': path.resolve(__dirname, 'test/unit'),
      '@testRoot': path.resolve(__dirname, 'test/e2e'),
    },
  },
});
