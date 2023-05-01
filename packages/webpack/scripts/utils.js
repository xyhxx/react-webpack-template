const chalk = require('chalk');
const detect = require('detect-port-alt');
const prompts = require('prompts');
const fs = require('fs-extra');
const {outputPath} = require('../config/paths');

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
  );
}

function startedServerLogger(port, host) {
  console.log();
  console.log(chalk.green('Server started! 🥰'));
  console.log();
  console.log(
    `Network: ${chalk.hex('#db5a6b').bold(`http://${host}:${port}`)}`,
  );
  console.log();
}

function errorLogger(error) {
  console.error(chalk.red(error + ' 😭'));
}

function junglePort(host, defaultPort) {
  const isInteractive = process.stdout.isTTY;

  return detect(defaultPort, host).then(
    function (port) {
      return new Promise(function (resolve) {
        if (port === defaultPort) return resolve(port);

        const message = `Something is already running on port ${defaultPort}.`;
        if (isInteractive) {
          clearConsole();
          const question = {
            type: 'confirm',
            name: 'changePort',
            message:
              chalk.yellow(message) +
              '\nWould you like to run the app on another port instead?',
            initial: true,
          };
          prompts(question).then(function ({changePort}) {
            changePort ? resolve(port) : resolve(null);
          });
        } else {
          console.log(chalk.red(message));
          resolve(null);
        }
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

function clearBuildFolder() {
  fs.emptyDirSync(outputPath);
}

function printBuildError(err) {
  const message = err != null && err.message;
  const stack = err != null && err.stack;

  if (
    stack &&
    typeof message === 'string' &&
    message.indexOf('from Terser') !== -1
  ) {
    try {
      const matched = /(.+)\[(.+):(.+),(.+)\]\[.+\]/.exec(stack);
      if (!matched) {
        throw new Error('Using errors for control flow is bad.');
      }
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

module.exports = {
  clearConsole,
  startedServerLogger,
  errorLogger,
  junglePort,
  clearBuildFolder,
  printBuildError,
};
