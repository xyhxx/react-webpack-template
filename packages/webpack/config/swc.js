const {srcPath} = require('./paths.js');
const browserslist = require('browserslist');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = function (isTs) {
  return {
    loader: require.resolve('swc-loader'),
    test: isTs ? /.tsx?$/ : /.(js|jsx|mjs)$/,
    include: srcPath,
    options: {
      jsc: {
        parser: {
          syntax: isTs ? 'typescript' : 'ecmascript',
          [isTs ? 'tsx' : 'jsx']: true,
        },
        transform: {
          react: {
            refresh: !isProduction,
            runtime: 'automatic',
          },
        },
      },
      env: {
        targets: browserslist(),
        mode: 'entry',
      },
    },
  };
};
