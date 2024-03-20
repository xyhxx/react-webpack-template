import {srcPath, require} from './paths.js';

const production = process.env.NODE_ENV === 'production';
const development = !production;

export default function () {
  return {
    test: /\.(js|jsx|ts|tsx|mjs)$/,
    include: srcPath,
    use: [
      require.resolve('thread-loader'),
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
                development,
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
            !development && [
              require.resolve('react-remove-properties'),
              {
                properties: ['data-testid'],
              },
            ],
            development && require.resolve('react-refresh/babel'),
          ].filter(Boolean),
          compact: production,
        },
      },
    ].filter(Boolean),
  };
}
