const alias = require('./alias');
const {
  outputPath,
  nodeModulesPath,
  assetsPublicPath,
  srcPath,
  rootPath,
} = require('./paths');
const plugins = require('./plugins');
const devServer = require('./devServer');
const rules = require('./rules');
const optimization = require('./optimization');
const {resolve} = require('path');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const useSourceMap = process.env.ENABLE_SOURCE_MAP === 'true';
const fileName = isProduction
  ? 'static/js/[name].[contenthash:8].js'
  : 'static/js/[name].js';

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
    clean: true,
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

const {wrap} = new SpeedMeasureWebpackPlugin({
  disable: isProduction,
});

module.exports = wrap(config);
