const {
  isProduction,
  enableThreadLoader,
} = require('./constants.js');

const {resolve} = require('path');

const {srcPath, appPath} = require('./paths.js');

module.exports = {
  test: /\.(js|jsx|ts|tsx|mjs)$/,
  include: srcPath,
  use: [
    enableThreadLoader && require.resolve('thread-loader'),
    {
      loader: require.resolve('babel-loader'),
      options: {
        plugins: [
          !isProduction
          && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
        compact: isProduction,
        cacheDirectory: resolve(appPath, '.temp-cache/babel-cache'),
        cacheCompression: false,
      },
    },
  ].filter(Boolean),
};
