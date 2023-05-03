import {srcPath, require} from './paths.ts';

const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;
const enableThreadLoader = process.env.ENABLE_THREAD_LOADER === 'true';

export default function () {
  return {
    test: /\.(js|jsx|ts|tsx|mjs)$/,
    include: srcPath,
    use: [
      enableThreadLoader && require.resolve('thread-loader'),
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [
              require.resolve('@babel/preset-env'),
              {
                useBuiltIns: 'entry',
                corejs: 3,
                exclude: ['transform-typeof-symbol'],
              },
            ],
            [
              require.resolve('@babel/preset-react'),
              {
                runtime: 'automatic',
                development: isDev,
              },
            ],
            require.resolve('@babel/preset-typescript'),
          ],
          plugins: [
            [
              require.resolve('@babel/plugin-transform-runtime'),
              {
                corejs: false,
                helpers: true,
                regenerator: true,
                useESModules: true,
              },
            ],
            !isDev && [
              require.resolve('react-remove-properties'),
              {
                properties: ['data-testid'],
              },
            ],
            isDev && require.resolve('react-refresh/babel'),
          ].filter(Boolean),
          compact: isProduction,
        },
      },
    ].filter(Boolean),
  };
}
