/// <reference types="vitest" />
import {defineConfig} from 'vitest/config';
import {resolve} from 'path';

export default defineConfig({
  test: {
    include: ['./src/**/*.{test, spec}.{js,jsx,ts,tsx}'],
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      reportsDirectory: '../../coverage',
    },
    globals: true,
  },
  resolve: {
    alias: {
      '@styles': resolve(__dirname, 'src/styles'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@routes': resolve(__dirname, 'src/routes'),
      '@apis': resolve(__dirname, 'src/apis'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@stores': resolve(__dirname, 'src/stores'),
      '@models': resolve(__dirname, 'src/models'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
});
