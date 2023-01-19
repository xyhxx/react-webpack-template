module.exports = {
  extends: 'proste/reactTS.js',
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: true,
  },
  overrides: [
    {
      files: [
        'packages/webpack/bin/**',
        'packages/webpack/config/**',
        'packages/webpack/scripts/**',
      ],
      parserOptions: {},
      extends: 'proste/javascript.js',
      rules: {
        'no-console': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
};