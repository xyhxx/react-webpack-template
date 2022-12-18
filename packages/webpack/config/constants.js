const ENV = process.env.NODE_ENV;
const MAX_CHUNK_SIZE = Number(process.env.MAX_CHUNK_SIZE ?? 0);
const enableThreadLoader = process.env.ENABLE_THREAD_LOADER === 'true';
const useSourceMap = process.env.ENABLE_SOURCE_MAP === 'true';
const isProduction = ENV === 'production';
const isDevelopment = ENV === 'development';
const buildSourceMap = isProduction ? useSourceMap : true;
const enableEsbuild = process.env.SWT_ENABLE_ESBUILD === 'true';

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
  useSourceMap,
  MAX_CHUNK_SIZE,
  enableThreadLoader,
  enableEsbuild,
};
