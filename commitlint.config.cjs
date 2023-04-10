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
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
