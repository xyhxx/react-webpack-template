#!/usr/bin/env node

import spawn from 'cross-spawn';
import {resolve} from 'path';
import {getSWTEnv} from '../config/env.js';
import {__dirname} from '../config/paths.js';

process.on('unhandledRejection', function(err) {
  throw err;
});

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'test' || x === 'dev',
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

/**
 * @param {string} name
 */
function setEnv(name) {
  switch (name) {
    case 'dev':
      process.env.NODE_ENV = 'development';
      break;
    case 'build':
      process.env.NODE_ENV = 'production';
      break;
  }

  const env = getSWTEnv();

  Object.assign(process.env, env);
}

function runScript() {
  const result = spawn.sync(
    process.execPath,
    nodeArgs
      .concat(resolve(__dirname, `../scripts/${script}`))
      .concat(process.argv.slice(scriptIndex + 1)),
    {stdio: 'inherit'},
  );
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. '
          + 'This probably means the system ran out of memory or someone called '
          + '`kill -9` on the process.',
      );
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. '
          + 'Someone might have called `kill` or `killall`, or the system could '
          + 'be shutting down.',
      );
    }

    process.exit(1);
  }

  return result;
}

function start() {
  if (['build', 'dev'].includes(script)) {
    setEnv(script);
    const {status} = runScript();
    process.exit(status ?? 1);
  } else {
    console.log('Unknown script "' + script + '".');
  }
}

start();
