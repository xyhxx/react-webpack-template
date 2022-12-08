import {appPath} from './paths.js';
import {ENV} from './constants.js';

import {resolve} from 'path';
import {config} from 'dotenv';

const commonEnv = resolve(appPath, 'env/.env');

const envs = {
  test: resolve(appPath, 'env/.env.test'),
  development: resolve(appPath, 'env/.env.development'),
  production: resolve(appPath, 'env/.env.production'),
};

function getEnv() {
  const common = config({path: commonEnv}).parsed;
  const value = config({path: envs[ENV]}).parsed;

  const temp = {};

  common && Object.assign(temp, common);
  value && Object.assign(temp, value);

  const result = {};
  for(const [key, value] of Object.entries(temp)){
    Object.assign(result, {[key]: JSON.stringify(value)});
  }

  return result;
};

export default getEnv;