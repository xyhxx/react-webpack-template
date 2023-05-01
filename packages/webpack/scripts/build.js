const webpack = require('webpack');
const chalk = require('chalk');
const config = require('../config/webpack.config');
const {
  errorLogger,
  clearBuildFolder,
  printBuildError,
  clearConsole,
} = require('./utils');
const formatWebpackMessage = require('./formatWebpackMessage');
const {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild,
} = require('./fileSizeUtils');
const {outputPath} = require('../config/paths');

const MAX_CHUNK_SIZE = Number(process.env.MAX_CHUNK_SIZE ?? 0);

function build(previousFileSizes) {
  const compiler = webpack(config);

  return new Promise(function (resolve, reject) {
    compiler.run(function (err, stats) {
      let message = '';
      if (err) {
        if (!err.message) {
          return reject(err);
        }

        message = formatWebpackMessage({
          errors: [err.message],
          warnings: [],
        });
      } else {
        message = formatWebpackMessage(
          stats.toJson({all: false, warnings: true, errors: true}),
        );
      }

      if (message.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (message.errors.length > 1) {
          message.errors.length = 1;
        }
        return reject(new Error(message.errors.join('\n\n')));
      }

      return resolve({
        stats,
        previousFileSizes,
        warnings: message.warnings,
      });
    });
  });
}

measureFileSizesBeforeBuild(outputPath)
  .then(function (prevFileSizes) {
    clearBuildFolder();
    clearConsole();

    return build(prevFileSizes);
  })
  .then(
    function ({stats, previousFileSizes, warnings}) {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.',
        );
        console.log(
          'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n',
        );
      } else {
        console.log(chalk.green('Successfully 🤩'));
        const {time} = stats.toJson();
        console.log(chalk.gray(`Compiled successfully in ${time / 1000}s`));
      }

      printFileSizesAfterBuild({
        webpackStats: stats,
        previousSizeMap: previousFileSizes,
        buildFolder: outputPath,
        maxSize: MAX_CHUNK_SIZE,
      });
    },
    function (err) {
      errorLogger('Failed to compile');
      console.log();
      printBuildError(err);
      console.log();
      process.exit(1);
    },
  )
  .catch(function (err) {
    if (err && err.message) {
      console.log();
      console.log(err.message);
      console.log();
    }
    process.exit(1);
  });
