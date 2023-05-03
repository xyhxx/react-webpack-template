import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../config/webpack.config.ts';
import chalk from 'chalk';
import {
  clearConsole,
  startedServerLogger,
  errorLogger,
  junglePort,
} from './utils.ts';

const isInteractive = process.stdout.isTTY;

const {host, port: defaultPort} = webpackConfig.devServer!;

function start(port: number) {
  const devServerOptions = {...webpackConfig.devServer, port};
  const compiler = Webpack(webpackConfig as any);
  const {host} = devServerOptions;
  const server = new WebpackDevServer(compiler, devServerOptions);
  console.log(chalk.hex('#065279')('Starting dev server...'));
  server.startCallback(function (err) {
    if (err) return errorLogger('Dev server start error');

    isInteractive && clearConsole();
    startedServerLogger(port, host);
  });
}

junglePort(host!, defaultPort as number)
  .then(function (port: any) {
    if (!port) return;

    start(port);
  })
  .catch(function (err: Error) {
    err && err.message && console.log(err.message);

    process.exit(1);
  });
