import chalk from 'chalk';
import detect from 'detect-port-alt';
import prompts from 'prompts';

export function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
  );
}

export function startedServerLogger(port, host) {
  console.log();
  console.log(chalk.green('Server started! 🥰'));
  console.log();
  console.log(`Network: ${chalk.hex('#db5a6b').bold(`http://${host}:${port}`)}`);
  console.log();
}

export function errorLogger(error) {
  console.error(chalk.red(error + ' 😭'));
}

export function junglePort(host, defaultPort) {
  const isInteractive = process.stdout.isTTY;

  return detect(defaultPort, host).then(
    function(port) {
      return new Promise(function(resolve) {
        if (port === defaultPort) return resolve(port);

        const message = `Something is already running on port ${defaultPort}.`;
        if (isInteractive) {
          clearConsole();
          const question = {
            type: 'confirm',
            name: 'changePort',
            message:
              chalk.yellow(
                message,
              ) + '\nWould you like to run the app on another port instead?',
            initial: true,
          };
          prompts(question).then(function({changePort}) {
            changePort ? resolve(port) : resolve(null);
          });
        } else {
          console.log(chalk.red(message));
          resolve(null);
        }
      });
    },
    function(err) {
      throw new Error(
        chalk.red(`Could not find an open port at ${chalk.bold(host)}.`)
          + '\n'
          + ('Network error message: ' + err.message || err)
          + '\n',
      );
    },
  );
}
