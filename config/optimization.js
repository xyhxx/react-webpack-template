const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const {isProduction} = require('./constants');

const optimization = {
  minimize: isProduction,
  minimizer: [
    new CssMinimizerPlugin(),
    new TerserWebpackPlugin({
      terserOptions: {
        compress: {
          warnings: false,
          comparisons: false,
          inline: 2,
        },
        mangle: {
          safari10: true,
        },
        keep_classnames: isProduction,
        keep_fnames: isProduction,
        output: {
          comments: false,
          ascii_only: true,
        },
      }
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