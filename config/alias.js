const {resolve} = require('path');

function aliasPath(url){
  return resolve(__dirname, '../src/', url);
}

module.exports = {
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
}