import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import {filesize} from 'filesize';
import recursive from 'recursive-readdir';
import stripAnsi from 'strip-ansi';
import type {Stats} from 'webpack';

function getDifferenceLabel(currentSize: number, previousSize: number) {
  const FIFTY_KILOBYTES = 1024 * 50;
  const difference = currentSize - previousSize;
  const fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
  if (difference >= FIFTY_KILOBYTES) return chalk.red('+' + fileSize);

  else if (
    difference < FIFTY_KILOBYTES
    && difference > 0
  ) return chalk.yellow('+' + fileSize);

  else if (difference < 0) return chalk.green(fileSize);

  return '';
}

function canReadAsset(asset: string) {
  return /\.(js|css)$/.test(asset);
}

function removeFileNameHash(buildFolder: string, fileName: string) {
  return fileName
    .replace(buildFolder, '')
    .replace(/\\/g, '/')
    .replace(
      /\/?(.*)(\.[0-9a-f]+)(\.chunk)?(\.js|\.css)/,
      // eslint-disable-next-line max-params
      (_, p1, __, ___, p4) => p1 + p4,
    );
}

function getFileSize(path: string) {
  const stats = fs.statSync(path);
  return stats.size;
}

export function printFileSizesAfterBuild(options: {
  webpackStats: Stats;
  previousSizeMap: Awaited<ReturnType<typeof measureFileSizesBeforeBuild>>;
  buildFolder: string;
  maxSize: number;
}) {
  const {webpackStats, previousSizeMap, buildFolder, maxSize} = options;

  const {root} = previousSizeMap;
  const {sizes} = previousSizeMap;
  const assetsList
    = webpackStats.toJson({
      all: false,
      assets: true,
      assetsSort: 'size',
    })?.assets ?? [];
  const assets = assetsList
    .filter(asset => canReadAsset(asset.name))
    .map(function(asset) {
      const size = getFileSize(path.join(root, asset.name));
      const previousSize = sizes[removeFileNameHash(root, asset.name)];
      const difference = getDifferenceLabel(size, previousSize);
      const isJs = path.extname(asset.name) === '.js';
      const pathPen = isJs ? chalk.hex('#48c0a3') : chalk.hex('#b0a4e3');
      const sizePen
        = size > maxSize ? chalk.hex('#ff2121').bold : chalk.hex('#0aa344');

      return {
        folder: path.join(path.basename(buildFolder), path.dirname(asset.name)),
        name: path.basename(asset.name),
        size,
        sizeLabel: filesize(size) + (difference ? ' (' + difference + ')' : ''),
        pathPen,
        sizePen,
      };
    });
  const longestSizeLabelLength = Math.max.apply(
    null,
    assets.map(a => stripAnsi(a.sizeLabel).length),
  );

  console.log();
  console.log('Packaging resource list:');
  console.log();

  let overstep = false;

  assets.forEach(function(asset) {
    const {sizeLabel, name, size, pathPen, sizePen, folder} = asset;
    let label = sizeLabel;

    const sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      label += rightPadding;
    }

    if (!overstep && size > maxSize && path.extname(name) === '.js')overstep = true;

    const filePath = folder + path.sep + name;
    console.log(sizePen(`Size: ${label}`), pathPen(filePath));
  });

  if (overstep) {
    const varColor = '#177cb0';
    const pathColor = '#f00056';
    console.log();
    console.log();
    console.log(
      chalk.grey(
        `Some chunks are larger ${filesize(
          maxSize,
        )} after compilation. Consider:`,
      ),
    );
    console.log();
    console.log(
      chalk.hex(pathColor)(
        '1.Using dynamic import() to code-split the application',
      ),
    );
    console.log(
      chalk.hex(pathColor)(
        '2.Adjust the prompt size by adjusting'
          + ` ${chalk.hex(varColor)('SWT_MAX_CHUNK_SIZE')}`
          + ` in ${chalk.white('packages/app/.env')}`,
      ),
    );
    console.log(
      chalk.hex(pathColor)(
        `3.Modify ${chalk.hex(varColor)('splitChunks')} in `
          + `${chalk.white('packages/webpack/config/optimization.js')}`,
      ),
    );
  }
}

export function measureFileSizesBeforeBuild(buildFolder: string) {
  return new Promise<{root: string; sizes: Record<string, number>}>(function(
    resolve,
  ) {
    recursive(buildFolder, function(err, fileNames) {
      let sizes;

      if (!err && fileNames) {
        sizes = fileNames
          .filter(canReadAsset)
          .reduce(function(memo: Record<string, number>, fileName) {
            const key = removeFileNameHash(buildFolder, fileName);
            memo[key] = getFileSize(fileName);
            return memo;
          }, {});
      }

      resolve({
        root: buildFolder,
        sizes: sizes || {},
      });
    });
  });
}
