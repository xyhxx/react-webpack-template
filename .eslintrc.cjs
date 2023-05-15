module.exports = {
  extends: ['proste/reactTS.js'],
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: true,
  },
  globals: {
    suite: true,
    test: true,
    describe: true,
    it: true,
    expect: true,
    assert: true,
    vitest: true,
    vi: true,
    beforeAll: true,
    afterAll: true,
    beforeEach: true,
    afterEach: true,
  },
  rules: {
    curly: [2, 'all'],
  },
  overrides: [
    {
      files: ['cypress/**', 'cypress.config.ts'],
      plugins: ['cypress'],
      parserOptions: {
        project: './cypress/tsconfig.json',
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
      env: {
        'cypress/globals': true,
      },
    },
    {
      files: [
        'packages/webpack/bin/**',
        'packages/webpack/config/**',
        'packages/webpack/scripts/**',
      ],
      parserOptions: {},
      extends: ['proste/typescript.js'],
      rules: {
        'no-console': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
};
