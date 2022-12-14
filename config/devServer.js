import ip from 'ip';

const {address} = ip;

export default {
  open: true,
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
