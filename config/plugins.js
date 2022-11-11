const {
  outputPath,
  publicPath,
  srcPath,
  nodeModulesPath,
  appPath,
} = require('./paths');
const {isProduction} = require('./constants');
const envList = require('./env');

const {resolve} = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackBar = require('webpackbar');
const {DefinePlugin} = require('webpack');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const plugins = [
  new WebpackBar(),
  new ESLintWebpackPlugin({
    extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
    context: srcPath,
    exclude: "node_modules",
    cache: true,
    cacheLocation: resolve(
      nodeModulesPath,
      ".cache/.eslintcache",
    ),
  }),
  new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: resolve(publicPath, "index.html"),
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
        : undefined
    )
  ),
  new DefinePlugin({
    'process.env': {
      ...envList(),
    }
  }),
  // 将public下面的资源复制到dist目录去（除了index.html）
  new CopyPlugin({
    patterns: [
      {
        from: publicPath,
        to: outputPath,
        toType: "dir",
        noErrorOnMissing: true, // 不生成错误
        globOptions: {
          // 忽略文件
          ignore: ["**/index.html"],
        },
        info: {
          // 跳过terser压缩js
          minimized: true,
        },
      },
    ],
  }),
];

if (isProduction) {
  plugins.push(
    new MiniCssExtractPlugin({
     filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: resolve(appPath, 'analyzer/index.html'),
    }),
  );
} else {
  plugins.push(
    new ReactRefreshWebpackPlugin({overlay: false}),
  );
}

module.exports = plugins;