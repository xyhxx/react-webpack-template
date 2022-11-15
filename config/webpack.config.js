const alias = require('./alias');
const {
  outputPath,
  nodeModulesPath,
  appPath,
  assetsPublicPath,
} = require('./paths');
const {isProduction, useSourceMap, enableSpeedMeasure} = require('./constants');
const plugins = require('./plugins');
const devServer = require('./devServer');
const rules = require('./rules');
const optimization = require('./optimization');

const {resolve} = require('path');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const {wrap} = new SpeedMeasurePlugin();


const config = {
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

module.exports = isProduction 
  ? config 
  : enableSpeedMeasure ? wrap(config) : config;