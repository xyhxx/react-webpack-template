<img src='./public/pLogo.svg' />
<h1 align='center'>React-Webpack5-Template</h1>

<br />
<br />

`An out of the box react webpack template,It is simpler, more convenient to customize and more modular on the basis of create-react-app.`

<br />
<br />

<h2>Warning</h2>

Do not modify files under `scripts` unless you are sure of the modified results

<br />
<br />

<h2>Usage</h2>

- Clone this repo, like `npx degit xyhxx/react-webpack5-template`. In addition, you can click "Use this template" to copy this template to your repositories

- Install all dependencies `npm install`

- Build under development mode `npm run dev`

- Build under production mode `npm run build`

- Unit test or integration test `npm run test`

- Other scripts can be viewed in package.json

<br />
<br />

<h2>Config</h2>

You can find all the webpack configuration files in the config folder and modify them, like alias plugins rules...

If you want to modify some configuration information, such as whether to enable `sourcemap` and `thread-loader`, you can find them in `config/constants.js`

<br />
<br />

<h2>Preset</h2>

The project directory and basic template information have been created in this package.

<br />
<br />

<h2>Tips</h2>

Using speed measure webpack plugin will cause the console to output `(node:7232) [DEP_WEBPACK_COMPILATION_NORMAL_MODULE_LOADER_HOOK] DeprecationWarning: ...`, which is just a compilation time analysis plug-in. If you do not want to output warnings, you can close it in `config/constants.js` and set `const enableSpeedMeasure = false`.