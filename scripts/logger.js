import chalk from 'chalk';

export function startedServerLogger(port, host) {
  console.log();
  console.log(chalk.green('Server started! 🥰'));
  console.log();
  console.log(`Network: ${chalk.hex('#db5a6b').bold(`http://${host}:${port}`)}`);
  console.log();
};

export function errorLogger(error) {
  console.error(chalk.red(error + ' 😭'));
};
