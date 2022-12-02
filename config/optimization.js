const {ESBuildMinifyPlugin} = require('esbuild-loader');

const {isProduction} = require('./constants');

const optimization = {
  minimize: isProduction,
  minimizer: [
    new ESBuildMinifyPlugin({
      css: true,
    }),
  ],
  runtimeChunk: {
    name: (entrypoint) => `runtime~${entrypoint.name}`,
  },
  splitChunks: {
    chunks: 'async',
    minSize: 20000,
    minRemainingSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    enforceSizeThreshold: 50000,
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
      reactVendors: {
        name: 'react-vendors',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)/,
        priority: 10,
        reuseExistingChunk: true,
      }
    },
  },
};

module.exports = optimization;