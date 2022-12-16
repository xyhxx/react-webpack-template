import {resolve} from 'path';
import {__dirname} from './constants.js';

function aliasPath(url) {
  return resolve(__dirname, '../src/', url);
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
};
