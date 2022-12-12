const {
  outputPath,
  publicPath,
  srcPath,
  rootPath,
} = require('./paths');
const {isProduction, isDevelopment} = require('./constants');
const envList = require('./env');

const {resolve} = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const {DefinePlugin} = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const plugins = [
  new WebpackBar(),
  new ForkTsCheckerWebpackPlugin({
    async: isDevelopment,
    issue: {
      include: [
        {file: '../**/src/**/*.{ts,tsx}'},
        {file: '**/src/**/*.{ts,tsx}'},
      ],
      exclude: [
        {file: '**/src/**/__tests__/**'},
        {file: '**/src/**/?(*.){spec|test}.*'},
        {file: '**/src/setupProxy.*'},
        {file: '**/src/setupTests.*'},
      ],
    },
  }),
  new ESLintWebpackPlugin({
    extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
    context: srcPath,
    exclude: 'node_modules',
    cache: true,
    cacheLocation: resolve(
      rootPath,
      '.temp-cache/.eslintcache',
    ),
  }),
  new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: resolve(publicPath, 'index.html'),
      },
      isProduction
        ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
        : void 0,
    ),
  ),
  new DefinePlugin({
    'process.env': {
      ...envList(),
    },
  }),
  new CopyPlugin({
    patterns: [
      {
        from: publicPath,
        to: outputPath,
        toType: 'dir',
        noErrorOnMissing: true,
        globOptions: {
          ignore: ['**/index.html', '**/pLogo.svg'],
        },
        info: {
          minimized: true,
        },
      },
    ],
  }),
];
if (isProduction)
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css',
      chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: resolve(rootPath, 'analyzer/index.html'),
    }),
  );
else
  plugins.push(
    new ReactRefreshWebpackPlugin({overlay: false}),
  );

module.exports = plugins;
