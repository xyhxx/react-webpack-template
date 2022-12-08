import alias from './alias.js';
import {
  outputPath,
  nodeModulesPath,
  appPath,
  assetsPublicPath,
} from './paths.js';
import {isProduction, useSourceMap} from './constants.js';
import plugins from './plugins.js';
import devServer from './devServer.js';
import rules from './rules.js';
import optimization from './optimization.js';

import {resolve} from 'path';

export default {
  stats: 'errors-warnings',
  target: ['browserslist'],
  entry: "./src/index.tsx",
  devtool: isProduction ? (useSourceMap ? 'source-map' : false) : 'cheap-module-source-map',
  mode: isProduction ? "production" : "development",
  performance: false,
  infrastructureLogging: {
    level: 'none',
  },
  output: {
    path: isProduction ? outputPath : void 0,
    filename: isProduction
      ? "static/js/[name].[contenthash:8].js"
      : "static/js/[name].js",
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:8].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: 'static/assets/[name].[hash][ext]',
    clean: true,
    publicPath: assetsPublicPath,
  },
  module: {
    rules,
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: resolve(appPath, '.temp-cache'),
  },
  plugins,
  optimization,
  resolve: {
    modules: ['node_modules', nodeModulesPath],
    extensions: [".jsx", ".js", ".ts", ".tsx", ".json"],
    alias,
  },
  devServer,
};
