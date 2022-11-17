const ENV = process.env.NODE_ENV;
const MAX_CHUNK_SIZE = 600 * 1024;

const useSourceMap = false;
const isProduction = ENV === "production";
const isDevelopment = ENV === "development";
const buildSourceMap = isProduction ? useSourceMap : true;

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  buildSourceMap,
  isDevelopment,
  isProduction,
  cssRegex,
  cssModuleRegex,
  sassRegex,
  sassModuleRegex,
  ENV,
  useSourceMap,
  MAX_CHUNK_SIZE,
}