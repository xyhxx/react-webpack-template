const babel = require('./babel');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const swc = require('./swc');

const isProduction = process.env.NODE_ENV === 'production';
const enableSWC = process.env.SWT_ENABLE_SWC === 'true';
const useSourceMap = process.env.ENABLE_SOURCE_MAP === 'true';
const buildSourceMap = isProduction ? useSourceMap : true;
const enableSass = process.env.SWT_ENABLE_SASS === 'true';

const moduleCssOptions = {
  localIdentName: '[local]-[hash:base64:5]',
  exportLocalsConvention: 'dashes',
};

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

function getStyleLoaders(cssOptions, preProcessor) {
  return [
    isProduction ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
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
      enableSass
        ? {
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
          }
        : void 0,
      enableSass
        ? {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: buildSourceMap,
                modules: moduleCssOptions,
              },
              'sass-loader',
            ),
          }
        : void 0,
    ].filter(Boolean),
  },
];

module.exports = rules;
