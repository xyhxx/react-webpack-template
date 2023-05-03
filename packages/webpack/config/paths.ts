import {resolve, dirname} from 'path';
import {realpathSync} from 'fs';
import {fileURLToPath} from 'url';
import {createRequire} from 'node:module';

export const require = createRequire(import.meta.url);

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const appDirection = realpathSync(process.cwd());

function resolvePath(url: string) {
  return resolve(appDirection, url);
}
export const outputPath = resolvePath('../../build');
export const srcPath = resolvePath('src');
export const nodeModulesPath = resolvePath('node_modules');
export const publicPath = resolvePath('public');
export const appPath = resolvePath('.');
export const pkgPath = resolvePath('package.json');
export const assetsPublicPath = '/';
export const indexHtmlPath = resolvePath('public/index.html');
export const rootPath = resolvePath('../../');
