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
};
