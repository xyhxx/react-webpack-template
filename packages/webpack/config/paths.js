const {resolve} = require('path');
const {realpathSync} = require('fs');

const appDirection = realpathSync(process.cwd());

function resolvePath(url) {
  return resolve(appDirection, url);
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
  appDirection,
  rootPath: resolvePath('../../'),
};
