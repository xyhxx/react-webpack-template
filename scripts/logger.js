const chalk = require('chalk');

function startedServer(port, host) {
  console.log('\n');
  console.log(chalk.green('Server started! ✓'));
  console.log('\n');
  console.log(`Network: ${chalk.hex('#db5a6b').bold(`http://${host}:${port}`)}`);
  console.log('\n');
};

function error(error) {
  console.error(chalk.red(error));
};

module.exports = {
  startedServerLogger: startedServer,
  errorLogger: error,
};
