const browserslistToEsbuild = require('browserslist-to-esbuild');

function esbuild(isTs) {
  return {
    test: !isTs ? /\.(js|jsx|mjs)$/ : /\.tsx?$/,
    loader: require.resolve('esbuild-loader'),
    options: {
      loader: isTs ? 'tsx' : 'jsx',
      target: browserslistToEsbuild(),
    },
  };
}

module.exports = esbuild;
