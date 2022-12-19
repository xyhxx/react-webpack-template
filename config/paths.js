import {resolve, dirname} from 'path';

import {fileURLToPath} from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

function resolvePath(url) {
  return resolve(__dirname, '..', url);
}

export const outputPath = resolvePath('build');
export const srcPath = resolvePath('src');
export const nodeModulesPath = resolvePath('node_modules');
export const publicPath = resolvePath('public');
export const appPath = resolvePath('.');
export const pkgPath = resolvePath('package.json');
export const assetsPublicPath = '/';
export const indexHtmlPath = resolvePath('public/index.html');
