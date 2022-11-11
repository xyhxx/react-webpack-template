
const {
  isProduction,
  enableThreadLoader,
} = require('./constants');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getStyleLoaders(cssOptions, preProcessor) {
  return [
    enableThreadLoader && require.resolve('thread-loader'),
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

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  );
}

module.exports = {
  getStyleLoaders,
  clearConsole,
}