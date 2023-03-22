<img src='./packages/app/public/pLogo.svg' />
<h1 align='center'>React-Webpack-Template</h1>

`An out of the box react webpack template,It is simpler, more convenient to customize and more modular on the basis of create-react-app.`

<br />

<h2>Warning</h2>

Do not modify files under `webpack` unless you are sure of the modified results

<br />

<h1>Babel</h2>

The project use SWC by default. If you want to use babel, please download
` babel-loader @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react @babel/preset-typescript babel-plugin-react-remove-properties thread-loader`
and set `SWT_ENABLE_SWC=false` in `.env`

<br />

<h2>Usage</h2>

- Clone this repo, like `pnpm dlx degit xyhxx/react-webpack-template#monorepo`. In addition, you can
  click "Use this template" to copy this template to your repositories

- Install all dependencies `pnpm install`

- Build under development mode `pnpm dev`

- Build under production mode `pnpm build`

- Unit test or integration test `pnpm test`

- Other scripts can be viewed in package.json

<br />

<h2>Config</h2>

Please do not modify the content in the webpack package. If you want to modify some content, such as
`sourcemap` or` thread-loader`, you can adjust it in `packages/app/.env`

<br />

<h2>ENV</h2>

If you want to add content in `process.env`, you can add it in `packages/app/.env`. **Don't forget
to add type to `packages/app/src/global.d.ts`**

We also support adding in the specified environment.

- development use `.env.dev`.
- production use `.env.pro`.
- test use `.env.test`.

<br />

<h2>Preset</h2>

The project directory and basic template information have been created in this package.

<br />
