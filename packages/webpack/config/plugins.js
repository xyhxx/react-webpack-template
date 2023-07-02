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

const {DefinePlugin} = webpack;

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

/** @type {import('webpack').Configuration['plugins']} */
const plugins = [
  new WebpackBar({
    color: '#057748',
  }),
  new ForkTsCheckerWebpackPlugin({
    async: isDevelopment,
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
    exclude: 'node_modules',
    cache: true,
    cacheLocation: resolve(rootPath, '.temp-cache/.eslintcache'),
  }),
  new HtmlWebpackPlugin(
    Object.assign(
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
    'process.env': Object.assign(
      {},
      {
        ...getEnv(),
      },
      process.env.IS_E2E ? {IS_E2E: 'true'} : void 0,
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
          ignore: ['**/index.html', '**/pLogo.svg'],
        },
        info: {
          minimized: true,
        },
      },
    ],
  }),
];

const fileName = 'static/css/[name].[contenthash:8].css';

if (isProduction) {
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
  );
} else {
  plugins.push(new ReactRefreshWebpackPlugin({overlay: false}));
}

export default plugins;
