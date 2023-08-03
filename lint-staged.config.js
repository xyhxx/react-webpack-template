module.exports = {
  '**/*/*.css': ['stylelint'],
  '**/*/*.{js,jsx,ts,tsx}': ['eslint'],
  '**/*/*.{ts,tsx}': () => `tsc -p ${__dirname}`,
};
