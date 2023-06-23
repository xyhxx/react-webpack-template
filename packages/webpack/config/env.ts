import {config} from 'dotenv';
import {resolve} from 'path';
import {appPath} from './paths.ts';

export type SWTEnv = {
  readonly HOST: string;
  readonly ENABLE_SOURCE_MAP: 'true' | undefined;
  readonly ENABLE_SWC: 'true' | undefined;
  readonly MAX_CHUNK_SIZE: 'true' | undefined;
};

const commonEnv = resolve(appPath, '.env');

const prefix = 'SWT_';

const envs = {
  test: resolve(appPath, '.env.test'),
  development: resolve(appPath, '.env.dev'),
  production: resolve(appPath, '.env.pro'),
};

const env: Record<string, string> = {};
const swtEnv: Record<string, string> = {};

function objectIsEmpty(obj: Record<string, string>) {
  return Object.getOwnPropertyNames(obj).length === 0;
}

function initEnv() {
  if (!objectIsEmpty(env) && !objectIsEmpty(swtEnv)) return;

  const ENV = process.env.NODE_ENV;

  const common = config({path: commonEnv}).parsed;
  const value = config({path: envs[ENV]}).parsed;

  const temp: Record<string, string> = {};
  common && Object.assign(temp, common);
  value && Object.assign(temp, value);

  for (const [key, value] of Object.entries(temp)) {
    !key.includes(prefix)
      ? (env[key] = JSON.stringify(value))
      : (swtEnv[key.replace(prefix, '')] = value);
  }
}

export function getSWTEnv() {
  initEnv();

  return swtEnv;
}

export function getEnv() {
  initEnv();

  return env;
}
