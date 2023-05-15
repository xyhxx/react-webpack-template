#!/usr/bin/env ts-node

import spawn from 'cross-spawn';
import {resolve} from 'path';
import {getSWTEnv} from '../config/env.ts';
import {__dirname} from '../config/paths.ts';

process.on('unhandledRejection', function(err) {
  throw err;
});

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'test' || x === 'dev',
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

type CanWrite<T> = {
  -readonly [K in keyof T]: T[K];
};

function setEnv(name: string) {
  switch (name) {
    case 'dev':
      (process.env as CanWrite<NodeJS.ProcessEnv>).NODE_ENV = 'development';
      break;
    case 'build':
      (process.env as CanWrite<NodeJS.ProcessEnv>).NODE_ENV = 'production';
      break;
  }

  const env = getSWTEnv();

  Object.assign(process.env, env);
}

function runScript() {
  const result = spawn.sync(
    'pnpm',
    nodeArgs
      .concat('ts-node')
      .concat(resolve(__dirname, `../scripts/${script}.ts`)),
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
