export default {
  '**/*/*.css': ['stylelint'],
  '**/*/*.{js,jsx,ts,tsx}': ['eslint'],
  '**/*/*.{ts,tsx}': () => 'tsc -p /',
};
