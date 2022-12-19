const {srcPath} = require('./paths.js');

const isProduction = process.env.NODE_ENV === 'production';

const swcTransformOptions = {
  react: {
    refresh: !isProduction,
    runtime: 'automatic',
  },
};
const swcParserOptions = {
};

module.exports = function(isTs) {
  return {
    loader: require.resolve('swc-loader'),
    test: isTs ? /.tsx?$/ : /.(js|jsx|mjs)$/,
    include: srcPath,
    options: {
      jsc: {
        parser: {
          syntax: isTs ? 'typescript' : 'ecmascript',
          [isTs ? 'tsx' : 'jsx']: true,
          ...swcParserOptions,
        },
        transform: {
          ...swcTransformOptions,
        },
        experimental: {
          plugins: [
            isProduction && [
              require.resolve('swc-plugin-react-remove-properties'),
              {
                properties: ['data-testid'],
              },
            ],
          ].filter(Boolean),
        },
      },
    },
  };
};
