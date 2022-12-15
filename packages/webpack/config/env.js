
const {config} = require('dotenv');
const {resolve} = require('path');
const {appPath} = require('./paths');
const {ENV} = require('./constants');

const commonEnv = resolve(appPath, '.env');

const prefix = 'SWT_';

const envs = {
  test: resolve(appPath, '.env.test'),
  development: resolve(appPath, '.env.dev'),
  production: resolve(appPath, '.env.pro'),
};

function getEnv() {
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

function getSWTEnv() {
  const common = config({path: commonEnv}).parsed;
  const result = {};

  for (const [key, value] of Object.entries(common))
    key.includes(prefix)
    && (result[key.replace(prefix, '')] = value);

  return result;
}

module.exports = {
  getEnv,
  getSWTEnv,
};
