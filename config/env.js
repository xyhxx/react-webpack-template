import {appPath} from './paths.js';

import {resolve} from 'path';
import {config} from 'dotenv';

const prefix = 'SWT_';

const commonEnv = resolve(appPath, '.env');

const envs = {
  test: resolve(appPath, '.env.test'),
  development: resolve(appPath, '.env.dev'),
  production: resolve(appPath, '.env.pro'),
};

const env = {};
const swtEnv = {};

function objectIsEmpty(obj) {
  return Object.getOwnPropertyNames(obj).length === 0;
}

function initEnv() {
  if (!objectIsEmpty(env) && !objectIsEmpty(swtEnv)) return;
  const ENV = process.env.NODE_ENV;

  const common = config({path: commonEnv}).parsed;
  const value = config({path: envs[ENV]}).parsed;

  const temp = {};
  common && Object.assign(temp, common);
  value && Object.assign(temp, value);

  for (const [key, value] of Object.entries(temp))
    !key.includes(prefix)
      ? env[key] = JSON.stringify(value)
      : swtEnv[key.replace(prefix, '')] = value;
}

export function getSWTEnv() {
  initEnv();

  return swtEnv;
}

export function getEnv() {
  initEnv();

  return env;
}
