import webpack from 'webpack';
import chalk from 'chalk';
import config from '../config/webpack.config.js';
import {
  errorLogger,
  clearBuildFolder,
  printBuildError,
  clearConsole,
} from './utils.js';
import formatWebpackMessage from './formatWebpackMessage.js';
import {outputPath} from '../config/paths.js';
import {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild,
} from './fileSizeUtils.js';

const MAX_CHUNK_SIZE = Number(process.env.SWT_MAX_CHUNK_SIZE ?? 0);

/**
 * @typedef PreviousFileSizes
 * @property {string} root
 * @property {Record<string, number>} sizes
 *
 * @typedef PromiseResolve
 * @property {import('webpack').Stats} stats
 * @property {PreviousFileSizes} previousFileSizes
 * @property {string[]} warnings
 *
 * @param {PreviousFileSizes} previousFileSizes
 *
 * @return {Promise<PromiseResolve>}
 */
function build(previousFileSizes) {
  const compiler = webpack(config);

  /**
   * @typedef PromiseResolve
   * @property  {import('webpack').Stats} states
   * @property {PreviousFileSizes} previousFileSizes
   * @property {string[]} warnings
   *
   * @type Promise<PromiseResolve>
   */
  return new Promise(function (resolve, reject) {
    compiler.run(function (err, stats) {
      let message = '';

      if (err) {
        if (!err.message) return reject(err);

        message = formatWebpackMessage({
          errors: [err.message],
          warnings: [],
        });
      } else {
        message = formatWebpackMessage(
          stats?.toJson({all: false, warnings: true, errors: true}),
        );
      }

      if (message.errors.length) {
        if (message.errors.length > 1) message.errors.length = 1;

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
