const {resolve} = require('path');

function resolvePath(url){
  return resolve(__dirname, '..', url);
}

module.exports = {
  outputPath: resolvePath('build'),
  srcPath: resolvePath('src'),
  nodeModulesPath: resolvePath('node_modules'),
  publicPath: resolvePath('public'),
  appPath: resolvePath('.'),
  pkgPath: resolvePath('package.json'),
  assetsPublicPath: '/',
  indexHtmlPath: resolvePath('public/index.html'),
}