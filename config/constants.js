const ENV = process.env.NODE_ENV;
const MAX_CHUNK_SIZE = 600 * 1024;

const useSourceMap = false;
const isProduction = ENV === "production";
const isDevelopment = ENV === "development";
const enableThreadLoader = true;
const buildSourceMap = isProduction ? useSourceMap : true;
const enableSpeedMeasure = true;

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  buildSourceMap,
  enableThreadLoader,
  isDevelopment,
  isProduction,
  cssRegex,
  cssModuleRegex,
  sassRegex,
  sassModuleRegex,
  ENV,
  useSourceMap,
  enableSpeedMeasure,
  MAX_CHUNK_SIZE,
}