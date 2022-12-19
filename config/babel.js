import {srcPath} from './paths.js';

const isProduction = process.env.NODE_ENV === 'production';
const enableThreadLoader = process.env.ENABLE_THREAD_LOADER === 'true';

export default function() {
  return {
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
}
