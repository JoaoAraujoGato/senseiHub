import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./frontend/src', import.meta.url)),
      '@shared': fileURLToPath(new URL('./shared', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['frontend/src/**/*.test.{js,jsx}', 'backend/src/**/*.test.js'],
    setupFiles: ['./frontend/src/test/setup.js'],
  },
});
