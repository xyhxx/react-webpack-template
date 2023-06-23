import webpack, {Stats} from 'webpack';
import chalk from 'chalk';
import config from '../config/webpack.config.ts';
import {
  errorLogger,
  clearBuildFolder,
  printBuildError,
  clearConsole,
} from './utils.ts';
import formatWebpackMessage from './formatWebpackMessage.ts';
import {outputPath} from '../config/paths.ts';
import {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild,
} from './fileSizeUtils.ts';
import {SWTEnv} from '../config/env.ts';

const MAX_CHUNK_SIZE = Number(
  (process.env as unknown as SWTEnv).MAX_CHUNK_SIZE ?? 0,
);

function build(previousFileSizes: {
  root: string;
  sizes: Record<string, number>;
}) {
  const compiler = webpack(config);

  return new Promise<{
    stats: Stats;
    previousFileSizes: {
      root: string;
      sizes: Record<string, number>;
    };
    warnings: string[];
  }>(function(resolve, reject) {
    compiler.run(function(err, stats) {
      let message:
      | string
      | {
        errors: string[];
        warnings: string[];
      } = '';

      if (err) {
        if (!err.message) return reject(err);

        message = formatWebpackMessage({
          errors: [err.message],
          warnings: [],
        });
      } else {
        message = formatWebpackMessage(
          stats?.toJson({all: false, warnings: true, errors: true}) as any,
        );
      }

      if (message.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (message.errors.length > 1)message.errors.length = 1;

        return reject(new Error(message.errors.join('\n\n')));
      }

      return resolve({
        stats: stats!,
        previousFileSizes,
        warnings: message.warnings,
      });
    });
  });
}

measureFileSizesBeforeBuild(outputPath)
  .then(function(prevFileSizes) {
    clearBuildFolder();
    clearConsole();

    return build(prevFileSizes);
  })
  .then(
    function({stats, previousFileSizes, warnings}) {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          '\nSearch for the '
            + chalk.underline(chalk.yellow('keywords'))
            + ' to learn more about each warning.',
        );
        console.log(
          'To ignore, add '
            + chalk.cyan('// eslint-disable-next-line')
            + ' to the line before.\n',
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
    function(err) {
      errorLogger('Failed to compile');
      console.log();
      printBuildError(err);
      console.log();
      process.exit(1);
    },
  )
  .catch(function(err) {
    if (err && err.message) {
      console.log();
      console.log(err.message);
      console.log();
    }
    process.exit(1);
  });
