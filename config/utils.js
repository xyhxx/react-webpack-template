
import {isProduction} from './constants.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function getStyleLoaders(cssOptions, preProcessor) {
  return  [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !isProduction,
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
          ],
        },
      },
    },
    preProcessor && {
      loader: preProcessor,
    },
  ].filter(Boolean);
};

export function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  );
}