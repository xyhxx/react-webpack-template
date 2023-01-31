
const {srcPath} = require('./paths.js');

const isProduction = process.env.NODE_ENV === 'production';
const enableThreadLoader = process.env.ENABLE_THREAD_LOADER === 'true';

module.exports = function() {
  return {
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
};
