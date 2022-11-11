const ip = require('ip');
console.log(process.env.HOST);
module.exports = {
  open: true,
  host: ip.address(),
  port: Number(process.env.HOST),
  hot: true,
  compress: true,
  historyApiFallback: true,
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  }
}