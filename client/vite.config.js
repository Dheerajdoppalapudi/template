import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setupTests.js'],  // Updated path to tests directory
    include: ['./tests/**/*.{test,spec}.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
      exclude: [
        'node_modules/',
        'src/main.jsx',
        'src/**/*.css',
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});