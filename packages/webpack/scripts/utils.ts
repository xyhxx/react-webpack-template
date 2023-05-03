import chalk from 'chalk';
import detect from 'detect-port-alt';
import prompts from 'prompts';
import fs from 'fs-extra';
import {outputPath} from '../config/paths.ts';

export function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
  );
}

export function startedServerLogger(port: number, host?: string) {
  console.log();
  console.log(chalk.green('Server started! 🥰'));
  console.log();
  console.log(
    `Network: ${chalk.hex('#db5a6b').bold(`http://${host}:${port}`)}`,
  );
  console.log();
}

export function errorLogger(error: string) {
  console.error(chalk.red(error + ' 😭'));
}

export function junglePort(host: string, defaultPort: number) {
  const isInteractive = process.stdout.isTTY;

  return detect(defaultPort, host).then(
    function (port) {
      return new Promise(function (resolve) {
        if (port === defaultPort) return resolve(port);

        const message = `Something is already running on port ${defaultPort}.`;
        if (isInteractive) {
          clearConsole();
          const question: prompts.PromptObject = {
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
    function (err: Error) {
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

export function printBuildError(err: Error) {
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
