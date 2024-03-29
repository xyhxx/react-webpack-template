module.exports = {
  extends: ['proste/reactTs', 'proste/vitest', 'prettier'],
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: true,
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
      extends: ['proste/typescript', 'prettier'],
      rules: {
        'no-console': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
};
