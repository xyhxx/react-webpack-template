import {srcPath, rootPath, require} from './paths.ts';

const isProduction = process.env.NODE_ENV === 'production';

export default function(isTs: boolean) {
  return {
    loader: require.resolve('swc-loader'),
    test: isTs ? /.tsx?$/ : /.(js|jsx|mjs)$/,
    include: srcPath,
    options: {
      jsc: {
        externalHelpers: true,
        parser: {
          syntax: isTs ? 'typescript' : 'ecmascript',
          [isTs ? 'tsx' : 'jsx']: true,
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          react: {
            refresh: !isProduction,
            runtime: 'automatic',
          },
          decoratorVersion: '2022-03',
        },
        experimental: {
          plugins: [
            isProduction && [
              require.resolve('swc-plugin-react-remove-properties'),
              {
                properties: ['data-testid'],
              },
            ],
          ].filter(Boolean),
        },
      },
      env: {
        path: rootPath,
        mode: 'entry',
        coreJs: '3.30.1',
      },
    },
  };
}
