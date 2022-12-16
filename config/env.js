import {appPath} from './paths.js';
import {ENV} from './constants.js';

import {resolve} from 'path';
import {config} from 'dotenv';

const prefix = 'SWT_';

const commonEnv = resolve(appPath, '.env');

const envs = {
  test: resolve(appPath, '.env.test'),
  development: resolve(appPath, '.env.dev'),
  production: resolve(appPath, '.env.pro'),
};

export function getEnv() {
  const common = config({path: commonEnv}).parsed;
  const value = config({path: envs[ENV]}).parsed;
  const temp = {};
  common && Object.assign(temp, common);
  value && Object.assign(temp, value);
  const result = {};

  for (const [key, value] of Object.entries(temp))
    !key.includes(prefix) && (result[key] = JSON.stringify(value));

  return result;
}

export function getSWTEnv() {
  const common = config({path: commonEnv}).parsed;
  const result = {};

  for (const [key, value] of Object.entries(common))
    key.includes(prefix)
    && (result[key.replace(prefix, '')] = value);

  return result;
}

