import {srcPath, require} from './paths.js';
import browserslist from 'browserslist';

const production = process.env.NODE_ENV === 'production';

/**
 * @param {boolean} ts
 */
export default function (ts) {
  return {
    loader: require.resolve('swc-loader'),
    test: ts ? /.tsx?$/ : /.(js|jsx|mjs)$/,
    include: srcPath,
    options: {
      jsc: {
        externalHelpers: true,
        parser: {
          syntax: ts ? 'typescript' : 'ecmascript',
          [ts ? 'tsx' : 'jsx']: true,
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          react: {
            refresh: !production,
            runtime: 'automatic',
          },
          decoratorVersion: '2022-03',
        },
      },
      env: {
        targets: browserslist(),
        mode: 'usage',
        coreJs: '3.36.1',
      },
    },
  };
}
