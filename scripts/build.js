const webpack = require('webpack');
const chalk = require('chalk');
const config = require('../config/webpack.config');
const {clearConsole} = require('../config/utils');

const MAX_CHUNK_SIZE = 500 * 1024;

console.log('Creating an optimized production build...');

function printAssets(assets){
  console.log('Packaging resource list:')
  console.log();

  let list = [];

  for (const [path, size] of Object.entries(assets)) {
    const isJs = path.lastIndexOf('.js') === path.length - 3;
    const isCss = path.lastIndexOf('.css') === path.length - 4;
    const isMedia = path.includes('static/assets');
    const sizeNum = size.size();
    const kbSize = Math.ceil(sizeNum / 1024);
    const sizePen = sizeNum > MAX_CHUNK_SIZE ? chalk.hex('#ff2121').bold : chalk.hex('#0aa344');
    const pathPen = isJs ? chalk.hex('#48c0a3') : (isCss ? chalk.hex('#b0a4e3') : chalk.hex('#eacd76'));

    if (isJs || isMedia || isCss) 
      list.push({
        path,
        size: `${kbSize} KB`,
        sizePen,
        pathPen,
      });
  }
  const maxLength = list.reduce(function (pre, next) {
    return next.size.length > pre ? next.size.length : pre;
  }, 0);

  list.forEach(function ({path, size, sizePen, pathPen}) {
    const afterSize = size.padEnd(maxLength + 2, ' ');

    console.log(sizePen(`Size: ${afterSize}`), pathPen(path));
  });
}

const compiler = webpack(config);
compiler.run(function(err, stats) {
  if (err) {
    console.log(chalk.red('build error: ', err.message));
    process.exit(1);
  }
  const assets = stats.compilation.assets;
  const startTime = stats.compilation.startTime;
  const endTime = stats.compilation.endTime;
  const time = endTime - startTime;

  clearConsole();
  console.log();
  console.log(chalk.green('Successfully ✔ '));
  console.log(
    chalk.gray(`Compiled successfully in ${(time / 1000).toFixed(2)}s`)
  );
  console.log();
  printAssets(assets);
  console.log();
});