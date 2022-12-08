import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {startedServerLogger, errorLogger} from './logger.js';
import webpackConfig from '../config/webpack.config.js';
import chalk from 'chalk';
import {clearConsole} from '../config/utils.js';

const isInteractive = process.stdout.isTTY;
  
const compiler = Webpack(webpackConfig);
const devServerOptions = {...webpackConfig.devServer};
const {port, host} = devServerOptions;
const server = new WebpackDevServer(compiler, devServerOptions);

console.log(chalk.hex('#065279')('Starting dev server...'))

server.startCallback(function (err) {
  if (err) {
    return errorLogger('Dev server start error');
  }

  isInteractive && clearConsole();
  startedServerLogger(port, host);
});