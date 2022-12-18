import browserslistToEsbuild from 'browserslist-to-esbuild';
import {srcPath} from './paths.js';

export default function esbuild(isTs) {
  return {
    test: !isTs ? /\.(js|jsx|mjs)$/ : /\.tsx?$/,
    loader: 'esbuild-loader',
    include: srcPath,
    options: {
      loader: isTs ? 'tsx' : 'jsx',
      target: browserslistToEsbuild(),
    },
  };
}
