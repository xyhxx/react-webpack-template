const {
  isProduction,
  enableThreadLoader,
} = require('./constants.js');

const {srcPath} = require('./paths.js');

module.exports = {
  test: /\.(js|jsx|ts|tsx|mjs)$/,
  include: srcPath,
  use: [
    enableThreadLoader && require.resolve('thread-loader'),
    {
      loader: require.resolve('babel-loader'),
      options: {
        compact: isProduction,
      },
    },
  ].filter(Boolean),
};
