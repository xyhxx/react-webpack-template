/* eslint-disable @typescript-eslint/naming-convention */
import {outputPath, publicPath, srcPath, rootPath} from './paths.js';
import {getEnv} from './env.js';
import {resolve} from 'path';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import WebpackBar from 'webpackbar';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {readFileSync} from 'fs';
import dateFormat from 'dateformat';
import CompressionPlugin from 'compression-webpack-plugin';

const appPackagePath = resolve(rootPath, './package.json');
const packageData = readFileSync(appPackagePath, 'utf-8');

/**
 * @typedef PakcageData
 * @property {string} version
 * @property {string} name
 */
/**
 * @type PakcageData
 */
const packageDataJson = JSON.parse(packageData);

const buildTime = dateFormat(new Date(), 'yyyymmddHHMMssl');

const version =
  process.env.NODE_ENV === 'development'
    ? `${packageDataJson.version}.${buildTime}`
    : packageDataJson.version;

const {DefinePlugin} = webpack;

const production = process.env.NODE_ENV === 'production';
const development = !production;

/** @type {import('webpack').Configuration['plugins']} */
const plugins = [
  new WebpackBar({
    color: '#057748',
  }),
  new ForkTsCheckerWebpackPlugin({
    async: development,
    typescript: {
      configFile: resolve(rootPath, './tsconfig.json'),
      diagnosticOptions: {
        syntactic: true,
      },
      mode: 'write-references',
    },
    issue: {
      include: [
        {file: '../**/src/**/*.{ts,tsx}'},
        {file: '**/src/**/*.{ts,tsx}'},
      ],
      exclude: [{file: '**/src/setupProxy.*'}, {file: '**/src/setupTests.*'}],
    },
  }),
  new ESLintWebpackPlugin({
    extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
    context: srcPath,
    exclude: ['assets/icons', 'node_modules'],
    cache: true,
    cacheLocation: resolve(rootPath, '.temp-cache/.eslintcache'),
  }),
  new HtmlWebpackPlugin(
    Object.assign(
      {
        inject: true,
        template: resolve(publicPath, 'index.html'),
        title: packageDataJson.title,
      },
      production
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
    'process.env': Object.assign(
      {},
      {
        ...getEnv(),
      },
      {
        E2E: `"${process.env.E2E}"`,
        VERSION: `"${version}"`,
        BUILD_TIME: `"${buildTime}"`,
      },
    ),
  }),
  new CopyPlugin({
    patterns: [
      {
        from: publicPath,
        to: outputPath,
        toType: 'dir',
        noErrorOnMissing: true,
        globOptions: {
          ignore: ['**/index.html'],
        },
        info: {
          minimized: true,
        },
      },
    ],
  }),
];

const fileName = 'static/css/[name].[contenthash:8].css';

if (production) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: fileName,
      chunkFilename: fileName,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: resolve(rootPath, 'analyzer/index.html'),
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      deleteOriginalAssets: false,
    }),
  );
} else {
  plugins.push(new ReactRefreshWebpackPlugin({overlay: false}));
}

export default plugins;
