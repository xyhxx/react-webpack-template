import ip from 'ip';
import {Configuration} from 'webpack';

const {address} = ip;

const config: Configuration['devServer'] = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  open: !process.env.IS_E2E,
  host: address(),
  port: Number(process.env.HOST),
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