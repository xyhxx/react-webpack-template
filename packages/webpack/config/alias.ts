import {resolve} from 'path';
import {appDirection} from './paths.ts';

function aliasPath(url: string) {
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
};
