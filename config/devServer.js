const ip = require('ip');


module.exports = {
  open: true,
  host: ip.address(),
  port: 509,
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