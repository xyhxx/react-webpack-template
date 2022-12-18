import {
  buildSourceMap,
  cssRegex,
  cssModuleRegex,
  sassRegex,
  sassModuleRegex,
  isProduction,
  enableEsbuild,
} from './constants.js';
import babel from './babel.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import esbuild from './esbuild.js';

const moduleCssOptions = {
  localIdentName: '[local]-[hash:base64:5]',
  exportLocalsConvention: 'dashes',
};

function getStyleLoaders(cssOptions, preProcessor) {
  return [
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
}

const rules = [
  {
    oneOf: [
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
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: buildSourceMap,
            modules: {
              mode: 'icss',
            },
          },
          'sass-loader',
        ),
        sideEffects: true,
      },
      {
        test: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: buildSourceMap,
            modules: moduleCssOptions,
          },
          'sass-loader',
        ),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{removeViewBox: false}],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: 'static/assets/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
      {
        exclude: [/^$/, /\.(js|jsx|ts|tsx|mjs)$/, /\.html$/, /\.json$/],
        type: 'asset/resource',
      },
      !enableEsbuild && babel,
      enableEsbuild && esbuild(true),
      enableEsbuild && esbuild(false),
    ].filter(Boolean),
  },
];

export default rules;
