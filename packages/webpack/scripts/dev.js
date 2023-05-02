import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../config/webpack.config.js';
import chalk from 'chalk';
import {
  clearConsole,
  startedServerLogger,
  errorLogger,
  junglePort,
} from './utils.js';

const isInteractive = process.stdout.isTTY;

const {host, port: defaultPort} = webpackConfig.devServer;

function start(port) {
  const devServerOptions = {...webpackConfig.devServer, port};
  const compiler = Webpack(webpackConfig);
  const {host} = devServerOptions;
  const server = new WebpackDevServer(compiler, devServerOptions);
  console.log(chalk.hex('#065279')('Starting dev server...'));
  server.startCallback(function (err) {
    if (err) return errorLogger('Dev server start error');

    isInteractive && clearConsole();
    startedServerLogger(port, host);
  });
}

junglePort(host, defaultPort)
  .then(function (port) {
    if (!port) return;

    start(port);
  })
  .catch(function (err) {
    err && err.message && console.log(err.message);

    process.exit(1);
  });
