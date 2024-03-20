import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const {swcMinify} = TerserPlugin;
const {lightningCssMinify} = CssMinimizerPlugin;
const production = process.env.NODE_ENV === 'production';

/** @type {import('webpack').Configuration['optimization']} */
const optimization = {
  minimize: production,
  minimizer: [
    new TerserPlugin({
      minify: swcMinify,
      extractComments: false,
      terserOptions: {
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
    }),
    new CssMinimizerPlugin({
      minify: lightningCssMinify,
    }),
  ],
  runtimeChunk: {
    name: 'webpackRuntime',
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
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      chunks: {
        name: 'chunks',
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
      common: {
        name: 'common',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router|@remix-run|scheduler|@tanstack|zod|i18next|lottie)/,
        priority: 10,
        reuseExistingChunk: true,
      },
      antd: {
        name: 'antd',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](antd|@ant-design|rc)/,
        priority: 10,
        reuseExistingChunk: true,
      },
    },
  },
};

export default optimization;
