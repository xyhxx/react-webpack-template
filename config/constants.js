const useSourceMap = false;
const ENV = process.env.NODE_ENV;
const isProduction = ENV === "production";
const isDevelopment = ENV === "development";
const enableThreadLoader = false;
const buildSourceMap = isProduction ? useSourceMap : true;
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
}