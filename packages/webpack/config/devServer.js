import ip from 'ip';

const {address} = ip;

/** @type {import('webpack').Configuration['devServer']}  */
const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  open: process.env.E2E === 'false',
  host: address(),
  port: Number(
    process.env.E2E === 'false'
      ? process.env.SWT_HOST
      : process.env.SWT_E2E_HOST,
  ),
  hot: true,
  compress: true,
  historyApiFallback: true,
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
};

export default config;
