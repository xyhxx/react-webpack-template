const alias = require('./alias');
const {
  outputPath,
  srcPath,
  nodeModulesPath,
  appPath,
  assetsPublicPath,
} = require('./paths');
const {getStyleLoaders} = require('./utils');
const {
  buildSourceMap,
  enableThreadLoader,
  isProduction,
  cssRegex,
  cssModuleRegex,
  sassRegex,
  sassModuleRegex,
} = require('./constants');
const plugins = require('./plugins');
const devServer = require('./devServer');

const {resolve} = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const config = {
  stats: 'errors-warnings',
  target: ['browserslist'],
  entry: "./src/index.tsx",
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  mode: isProduction ? "production" : "development",
  performance: false,
  infrastructureLogging: {
    level: 'none',
  },
  output: {
    path: isProduction ? outputPath : void 0,
    filename: isProduction
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js",
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: 'static/assets/[name].[hash][ext]',
    clean: true,
    publicPath: assetsPublicPath,
  },
  module: {
    rules: [
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
                mode: 'local',
                localIdentName: '[name]-[hash:base64:5]',
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
                  mode: 'local',
                  localIdentName: '[name]-[hash:base64:5]',
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
            test: /\.(js|jsx|ts|tsx|mjs)$/,
            include: srcPath,
            use: [
              enableThreadLoader && require.resolve('thread-loader'),
              {
                loader: require.resolve('babel-loader'),
                options: {
                  customize: require.resolve(
                    'babel-preset-react-app/webpack-overrides'
                  ),
                  presets: [
                    [
                      require.resolve('babel-preset-react-app'),
                      {
                        runtime: 'automatic',
                      },
                    ],
                  ],
                  
                  plugins: [
                    !isProduction 
                    && require.resolve('react-refresh/babel'),
                  ].filter(Boolean),
                  cacheDirectory: true,
                  cacheCompression: false,
                  compact: isProduction,
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
    ],
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: resolve(appPath, '.temp-cache'),
  },
  plugins,
  optimization: {
    minimize: isProduction,
    // 压缩的操作
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserWebpackPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: isProduction,
          keep_fnames: isProduction,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        }
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        reactVendors: {
          name: 'react-vendors',
          chunks: 'all',
          test: /(react|react-dom|react-dom-router)/,
          priority: 10,
        }
      }
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  resolve: {
    modules: ['node_modules', nodeModulesPath],
    extensions: [".jsx", ".js", ".ts", ".tsx", ".json"],
    alias,
  },
  devServer,
};

module.exports = config;