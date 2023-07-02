module.exports = {
  extends: ['proste/reactTS', 'proste/vitest'],
  plugins: ['xyhxx'],
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: true,
  },
  rules: {
    'xyhxx/if-line': 1,
    'xyhxx/object-pattern-newline': 1,
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
      extends: ['proste/javascript'],
      rules: {
        'no-console': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
};
