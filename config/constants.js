import {dirname} from "path";
import {fileURLToPath} from "url";

export const ENV = process.env.NODE_ENV;
export const MAX_CHUNK_SIZE = Number(process.env.MAX_CHUNK_SIZE ?? 0);
export const enableThreadLoader = process.env.ENABLE_THREAD_LOADER === 'true';
export const useSourceMap = process.env.ENABLE_SOURCE_MAP === 'true';
export const isProduction = ENV === "production";
export const isDevelopment = ENV === "development";
export const buildSourceMap = isProduction ? useSourceMap : true;

export const cssRegex = /\.css$/;
export const cssModuleRegex = /\.module\.css$/;
export const sassRegex = /\.(scss|sass)$/;
export const sassModuleRegex = /\.module\.(scss|sass)$/;

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);