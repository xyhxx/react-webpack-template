const {appPath} = require('./paths');
const {ENV} = require('./constants');

const {resolve} = require('path');
const {config} = require('dotenv');

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

  const resule = {};
  for(const [key, value] of Object.entries(temp)){
    Object.assign(resule, {[key]: JSON.stringify(value)});
  }

  return resule;
};

module.exports = getEnv;