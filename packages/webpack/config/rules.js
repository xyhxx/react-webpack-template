import babel from './babel.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import swc from './swc.js';
import {require} from './paths.js';
import tailwindcss from 'tailwindcss';

const isProduction = process.env.NODE_ENV === 'production';
const enableSWC = process.env.SWT_ENABLE_SWC === 'true';
const useSourceMap = process.env.SWT_ENABLE_SOURCE_MAP === 'true';
const buildSourceMap = isProduction ? useSourceMap : true;

const moduleCssOptions = {
  localIdentName: '[local]-[hash:base64:5]',
  exportLocalsConvention: 'dashes',
};

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

/**
 * @param {Record<string, unknown>} cssOptions
 */
function getStyleLoaders(cssOptions) {
  return [
    isProduction
      ? MiniCssExtractPlugin.loader
      : require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: !isProduction,
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: [
            'postcss-nesting',
            'postcss-flexbugs-fixes',
            ['tailwindcss/nesting', 'postcss-nesting'],
            tailwindcss,
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
  ].filter(Boolean);
}

const rules = [
  {
    oneOf: [
      {
        test: /\.ldicons\.js$/,
        type: 'asset/resource',
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: buildSourceMap,
          modules: {
            mode: 'icss',
          },
        }),
        sideEffects: true,
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: buildSourceMap,
          modules: moduleCssOptions,
        }),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        exclude: [/^$/, /\.(js|jsx|ts|tsx|mjs)$/, /\.html$/, /\.json$/],
        type: 'asset/resource',
      },
      !enableSWC && babel(),
      enableSWC && swc(false),
      enableSWC && swc(true),
    ].filter(Boolean),
  },
];

export default rules;
