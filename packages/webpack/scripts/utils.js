import chalk from 'chalk';
import detect from 'detect-port-alt';
import fs from 'fs-extra';
import {outputPath} from '../config/paths.js';

export function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
  );
}

/**
 * @param {number} port
 * @param {string} host
 */
export function startedServerLogger(port, host) {
  console.log();
  console.log(chalk.green('Server started! 🥰'));
  console.log();
  console.log(
    `Network: ${chalk.hex('#db5a6b').bold(`http://${host}:${port}`)}`,
  );
  console.log();
}

/**
 * @param {string} error
 */
export function errorLogger(error) {
  console.error(chalk.red(error + ' 😭'));
}

/**
 * @param {string} host
 * @param {number} defaultPort
 */
export function choosePort(host, defaultPort) {
  return detect(defaultPort, host).then(
    function (port) {
      return new Promise(function (resolve) {
        resolve(port);
      });
    },
    function (err) {
      throw new Error(
        chalk.red(`Could not find an open port at ${chalk.bold(host)}.`) +
          '\n' +
          ('Network error message: ' + err.message || err) +
          '\n',
      );
    },
  );
}
export function clearBuildFolder() {
  fs.emptyDirSync(outputPath);
}

/**
 * @param {Error} err
 */
export function printBuildError(err) {
  const message = err != null && err.message;
  const stack = err != null && err.stack;

  if (
    stack &&
    typeof message === 'string' &&
    message.indexOf('from Terser') !== -1
  ) {
    try {
      const matched = /(.+)\[(.+):(.+),(.+)\]\[.+\]/.exec(stack);
      if (!matched) throw new Error('Using errors for control flow is bad.');

      const [, , problemPath, line, column] = matched;
      console.log(
        'Failed to minify the code from this file: \n\n',
        chalk.yellow(
          `\t${problemPath}:${line}${column !== '0' ? ':' + column : ''}`,
        ),
        '\n',
      );
    } catch (ignored) {
      console.log('Failed to minify the bundle.', err);
    }
  } else {
    console.log((message || err) + '\n');
  }

  console.log();
}
