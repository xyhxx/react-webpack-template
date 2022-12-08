import babelJest from 'babel-jest';

export default babelJest.createTransformer({
  "presets": [
    [
      "@babel/preset-env",
      {
        targets: {
          node: 'current',
        },
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        useBuiltIns: true
      }
    ],
    "@babel/preset-typescript"
  ],
  babelrc: false,
  configFile: false,
});

// const babelJest = require('babel-jest').default;

// module.exports = babelJest.createTransformer({
//   "presets": [
//     [
//       "@babel/preset-env",
//       {
//         targets: {
//           node: 'current',
//         },
//       },
//     ],
//     [
//       "@babel/preset-react",
//       {
//         runtime: "automatic",
//         useBuiltIns: true
//       }
//     ],
//     "@babel/preset-typescript"
//   ],
//   babelrc: false,
//   configFile: false,
// });