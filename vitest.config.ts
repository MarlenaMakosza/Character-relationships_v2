import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

const VITE_CONFIG = './vite.config.ts';

export default defineConfig({
  test: {
    projects: [
      {
        extends: VITE_CONFIG,
        plugins: [svelteTesting()],
        test: {
          name: 'client',
          environment: 'jsdom',
          clearMocks: true,
          include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          exclude: ['src/lib/server/**'],
          setupFiles: ['./vitest-setup-client.ts'],
        },
      },
      {
        extends: VITE_CONFIG,
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
        },
      },
      {
        extends: VITE_CONFIG,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
          testTimeout: 60_000,
          hookTimeout: 60_000,
        },
      },
    ],
  },
});
