const {ENV} = require('./constants');

const {config} = require('dotenv');

const commonEnv = require.resolve('../env/.env');

const envs = {
  test: require.resolve('../env/.env.test'),
  development: require.resolve('../env/.env.development'),
  production: require.resolve('../env/.env.production'),
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
