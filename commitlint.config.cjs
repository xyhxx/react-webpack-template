module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // new function
        'fix', // fix the problem
        'style', // modify code format
        'refactor', // refactor code
        'test', // add test
        'perf', // performance optimization
        'chore', // adding or removing dependencies, tools
        'update', // update code
        'revert',
        'merge',
        'build',
      ],
    ],
  },
};
