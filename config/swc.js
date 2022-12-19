import {srcPath} from './paths.js';

const isProduction = process.env.NODE_ENV === 'production';

const swcTransformOptions = {
  react: {
    refresh: !isProduction,
    runtime: 'automatic',
  },
};
const swcParserOptions = {
};

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
          ...swcParserOptions,
        },
        transform: {
          ...swcTransformOptions,
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
    },
  };
}
