const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const {isProduction} = require('./constants');

const optimization = {
  minimize: isProduction,
  minimizer: [
    new CssMinimizerPlugin(),
    new TerserWebpackPlugin({
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
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
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      }
    }),
  ],
  runtimeChunk: {
    name: (entrypoint) => `runtime~${entrypoint.name}`,
  },
};

module.exports = optimization;