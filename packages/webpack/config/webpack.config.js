import alias from './alias.js';
import plugins from './plugins.js';
import devServer from './devServer.js';
import rules from './rules.js';
import optimization from './optimization.js';
import {resolve} from 'path';
import {
  outputPath,
  nodeModulesPath,
  assetsPublicPath,
  srcPath,
  rootPath,
} from './paths.js';

const isProduction = process.env.NODE_ENV === 'production';
const useSourceMap = process.env.ENABLE_SOURCE_MAP === 'true';
const fileName = isProduction
  ? 'static/js/[name].[contenthash:8].js'
  : 'static/js/[name].js';

/** @type {import('webpack').Configuration} */
const config = {
  stats: 'errors-warnings',
  target: ['browserslist'],
  entry: resolve(srcPath, 'index.tsx'),
  devtool: isProduction
    ? useSourceMap
      ? 'source-map'
      : false
    : 'cheap-module-source-map',
  mode: isProduction ? 'production' : 'development',
  performance: false,
  infrastructureLogging: {
    level: 'none',
  },
  output: {
    path: isProduction ? outputPath : void 0,
    filename: fileName,
    chunkFilename: fileName,
    assetModuleFilename: 'static/assets/[name].[hash][ext]',
    publicPath: assetsPublicPath,
  },
  module: {
    rules,
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: resolve(rootPath, '.temp-cache'),
  },
  plugins,
  optimization,
  resolve: {
    modules: ['node_modules', nodeModulesPath],
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.json'],
    alias,
  },
  devServer,
};

export default config;
