import {resolve} from 'path';
import {appDirection} from './paths.js';

/**
 * @param {string} url
 */
function aliasPath(url) {
  return resolve(appDirection, 'src/', url);
}

export default {
  '@styles': aliasPath('styles'),
  '@assets': aliasPath('assets'),
  '@routes': aliasPath('routes'),
  '@apis': aliasPath('apis'),
  '@components': aliasPath('components'),
  '@hooks': aliasPath('hooks'),
  '@pages': aliasPath('pages'),
  '@stores': aliasPath('stores'),
  '@utils': aliasPath('utils'),
  '@models': aliasPath('models'),
  '@locales': aliasPath('locales'),
};
