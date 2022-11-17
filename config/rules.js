const { getStyleLoaders } = require('./utils');
const {
  buildSourceMap,
  isProduction,
  cssRegex,
  cssModuleRegex,
  sassRegex,
  sassModuleRegex,
} = require('./constants');
const { srcPath } = require('./paths');
const swcTransformOptions = {
  react: {
    refresh: !isProduction,
    runtime: 'automatic'
  },
};
const swcParserOptions = {
};

const rules = [
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
            loader: require.resolve('@svgr/webpack'),
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
            loader: require.resolve('file-loader'),
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
        test: /.(ts|tsx)$/,
        include: srcPath,
        use: [
          {
            loader: require.resolve('swc-loader'),
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                  ...swcParserOptions,
                },
                transform: {
                  ...swcTransformOptions,
                },
              },
            },
          }
        ],
      },
      {
        test: /.(|js|jsx|mjs)$/,
        include: srcPath,
        use: [
          {
            loader: require.resolve('swc-loader'),
            options: {
              jsc: {
                parser: {
                  syntax: "ecmascript",
                  jsx: true,
                  ...swcParserOptions,
                },
                transform: {
                  ...swcTransformOptions,
                },
              },
            },
          }
        ],
      },
      {
        exclude: [/^$/, /\.(js|jsx|ts|tsx|mjs)$/, /\.html$/, /\.json$/],
        type: 'asset/resource',
      },
    ],
  },
];

module.exports = rules;