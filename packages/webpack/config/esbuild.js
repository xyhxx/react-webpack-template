const browserslistToEsbuild = require('browserslist-to-esbuild');
const {srcPath} = require('./paths.js');

function esbuild(isTs) {
  return {
    test: !isTs ? /\.(js|jsx|mjs)$/ : /\.tsx?$/,
    loader: require.resolve('esbuild-loader'),
    include: srcPath,
    options: {
      loader: isTs ? 'tsx' : 'jsx',
      target: browserslistToEsbuild(),
    },
  };
}

module.exports = esbuild;
