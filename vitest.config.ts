import {defineConfig} from 'vitest/config';
import {resolve} from 'path';

const aliasBasePath = 'packages/app/src/';

export default defineConfig({
  test: {
    include: ['./src/**/*.{test, spec}.{js,jsx,ts,tsx}'],
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@styles': resolve(__dirname, aliasBasePath, 'styles'),
      '@assets': resolve(__dirname, aliasBasePath, 'assets'),
      '@routes': resolve(__dirname, aliasBasePath, 'routes'),
      '@apis': resolve(__dirname, aliasBasePath, 'apis'),
      '@components': resolve(__dirname, aliasBasePath, 'components'),
      '@hooks': resolve(__dirname, aliasBasePath, 'hooks'),
      '@pages': resolve(__dirname, aliasBasePath, 'pages'),
      '@stores': resolve(__dirname, aliasBasePath, 'stores'),
      '@models': resolve(__dirname, aliasBasePath, 'models'),
      '@utils': resolve(__dirname, aliasBasePath, 'utils'),
    },
  },
});
