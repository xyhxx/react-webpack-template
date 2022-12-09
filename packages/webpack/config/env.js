const {ENV} = require('./constants');

const {resolve} = require('path');
const {config} = require('dotenv');

const commonEnv = resolve(__dirname, '../env/.env');

const envs = {
  test: resolve(__dirname, '../env/.env.test'),
  development: resolve(__dirname, '../env/.env.development'),
  production: resolve(__dirname, '../env/.env.production'),
};

function getEnv() {
  const common = config({path: commonEnv}).parsed;
  const value = config({path: envs[ENV]}).parsed;
  const temp = {};
  common && Object.assign(temp, common);
  value && Object.assign(temp, value);
  const result = {};
  for (const [key, value] of Object.entries(temp))
    Object.assign(result, {[key]: JSON.stringify(value)});

  return result;
}

module.exports = getEnv;
