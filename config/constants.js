import {dirname} from "path";
import {fileURLToPath} from "url";

export const ENV = process.env.NODE_ENV;
export const MAX_CHUNK_SIZE = 600 * 1024;
export const enableThreadLoader = true;
export const useSourceMap = false;
export const isProduction = ENV === "production";
export const isDevelopment = ENV === "development";
export const buildSourceMap = isProduction ? useSourceMap : true;

export const cssRegex = /\.css$/;
export const cssModuleRegex = /\.module\.css$/;
export const sassRegex = /\.(scss|sass)$/;
export const sassModuleRegex = /\.module\.(scss|sass)$/;

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);