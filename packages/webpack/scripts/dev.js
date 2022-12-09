const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const {startedServerLogger, errorLogger} = require('./logger');
const webpackConfig = require('../config/webpack.config');
const chalk = require('chalk');
const {clearConsole} = require('../config/utils');

const isInteractive = process.stdout.isTTY;

const compiler = Webpack(webpackConfig);
const devServerOptions = {...webpackConfig.devServer};
const {port, host} = devServerOptions;
const server = new WebpackDevServer(compiler, devServerOptions);
console.log(chalk.hex('#065279')('Starting dev server...'));
server.startCallback(function(err) {
  if (err)
    return errorLogger('Dev server start error');

  isInteractive && clearConsole();
  startedServerLogger(port, host);
});
