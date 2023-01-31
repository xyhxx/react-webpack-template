
const {config} = require('dotenv');
const {resolve} = require('path');
const {appPath} = require('./paths');

const commonEnv = resolve(appPath, '.env');

const prefix = 'SWT_';

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

function getSWTEnv() {
  initEnv();

  return swtEnv;
}

function getEnv() {
  initEnv();

  return env;
}

module.exports = {
  getEnv,
  getSWTEnv,
};
