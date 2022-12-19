import {srcPath} from './paths.js';
import browserslist from 'browserslist';

const isProduction = process.env.NODE_ENV === 'production';

export default function(isTs) {
  return {
    loader: 'swc-loader',
    test: isTs ? /.tsx?$/ : /.(js|jsx|mjs)$/,
    include: srcPath,
    options: {
      jsc: {
        parser: {
          syntax: isTs ? 'typescript' : 'ecmascript',
          [isTs ? 'tsx' : 'jsx']: true,
        },
        loose: true,
        transform: {
          react: {
            refresh: !isProduction,
            runtime: 'automatic',
          },
        },
        experimental: {
          plugins: [
            isProduction && [
              'swc-plugin-react-remove-properties', {
                properties: ['data-testid'],
              },
            ],
          ].filter(Boolean),
        },
      },
      env: {
        targets: browserslist(),
        mode: 'entry',
      },
    },
  };
}
