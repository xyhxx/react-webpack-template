import {srcPath, appPath} from './paths.js';
import {
  isProduction,
  enableThreadLoader,
} from './constants.js';

import {resolve} from 'path';

export default {
  test: /\.(js|jsx|ts|tsx|mjs)$/,
  include: srcPath,
  use: [
    enableThreadLoader && 'thread-loader',
    {
      loader: 'babel-loader',
      options: {
        plugins: [
          !isProduction
          && 'react-refresh/babel',
        ].filter(Boolean),
        compact: isProduction,
        cacheDirectory: resolve(appPath, '.temp-cache/babel-cache'),
        cacheCompression: false
      },
    }
  ].filter(Boolean),
};