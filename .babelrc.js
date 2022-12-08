const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: isDev,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime', 
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: true,
      }
    ],
    !isDev && [
      'react-remove-properties',
      {
        'properties': ['data-testid'],
      },
    ],
  ].filter(Boolean),
}