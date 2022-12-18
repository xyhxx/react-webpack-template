import browserslistToEsbuild from 'browserslist-to-esbuild';

export default function esbuild(isTs) {
  return {
    test: !isTs ? /\.(js|jsx|mjs)$/ : /\.tsx?$/,
    loader: 'esbuild-loader',
    options: {
      loader: isTs ? 'tsx' : 'jsx',
      target: browserslistToEsbuild(),
    },
  };
}
