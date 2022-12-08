import { getStyleLoaders } from './utils.js';
import {
  buildSourceMap,
  isProduction,
  cssRegex,
  cssModuleRegex,
  sassRegex,
  sassModuleRegex,
  enableThreadLoader,
} from './constants.js';
import { srcPath } from './paths.js';

export default [
  {
    oneOf: [
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: buildSourceMap,
          modules: {
            mode: 'icss',
          },
        }),
        sideEffects: true,
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: buildSourceMap,
          modules: {
            localIdentName: '[local]-[hash:base64:5]',
          },
        }),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: buildSourceMap,
            modules: {
              mode: 'icss',
            },
          },
          'sass-loader'
        ),
        sideEffects: true,
      },
      {
        test: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: buildSourceMap,
            modules: {
              localIdentName: '[local]-[hash:base64:5]',
            },
          },
          'sass-loader'
        ),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: 'static/assets/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
      {
        test: /\.(js|jsx|ts|tsx|mjs)$/,
        include: srcPath,
        use: [
          enableThreadLoader && 'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                !isProduction
                && 'react-refresh/babel',
              ].filter(Boolean),
              compact: isProduction,
              cacheDirectory: true,
              cacheCompression: false
            },
          }
        ].filter(Boolean),
      },
      {
        exclude: [/^$/, /\.(js|jsx|ts|tsx|mjs)$/, /\.html$/, /\.json$/],
        type: 'asset/resource',
      },
    ],
  },
];
