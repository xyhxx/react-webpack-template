import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const optimization = {
  minimize: isProduction,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
    }),
    new CssMinimizerPlugin(),
  ],
  runtimeChunk: {
    name: entrypoint => `runtime~${entrypoint.name}`,
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
        name: 'defaultVendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        name: 'defaultChunks',
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
      reactVendors: {
        name: 'reactVendors',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router|@remix-run|scheduler)/,
        priority: 10,
        reuseExistingChunk: true,
      },
    },
  },
};

export default optimization;
