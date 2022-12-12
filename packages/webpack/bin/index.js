#!/usr/bin/env node

const spawn = require('cross-spawn');
const {resolve} = require('path');

process.on('unhandledRejection', function(err) {
  throw err;
});

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'test' || x === 'dev',
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

if (['build', 'dev', 'test'].includes(script)) {
  switch (script) {
    case 'dev':
      process.env.NODE_ENV = 'development';
      break;
    case 'build':
      process.env.NODE_ENV = 'production';
      break;
    case 'test':
      process.env.NODE_ENV = 'test';
      break;
  }

  const result = spawn.sync(
    process.execPath,
    nodeArgs
      .concat(resolve(__dirname, `../scripts/${script}`))
      .concat(process.argv.slice(scriptIndex + 1)),
    {stdio: 'inherit'},
  );
  if (result.signal) {
    if (result.signal === 'SIGKILL')
      console.log(
        'The build failed because the process exited too early. '
          + 'This probably means the system ran out of memory or someone called '
          + '`kill -9` on the process.',
      );
    else if (result.signal === 'SIGTERM')
      console.log(
        'The build failed because the process exited too early. '
          + 'Someone might have called `kill` or `killall`, or the system could '
          + 'be shutting down.',
      );

    process.exit(1);
  }
  process.exit(result.status);
} else
  console.log('Unknown script "' + script + '".');
