import {srcPath} from './paths.js';
import {
  isProduction,
  enableThreadLoader,
} from './constants.js';

export default {
  test: /\.(js|jsx|ts|tsx|mjs)$/,
  include: srcPath,
  use: [
    enableThreadLoader && 'thread-loader',
    {
      loader: 'babel-loader',
      options: {
        compact: isProduction,
      },
    },
  ].filter(Boolean),
};
