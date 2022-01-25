const fs = require('fs')
const config = require('./src/api/config')

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },

  devServer: {
    host: '0.0.0.0',
    public: config.server.hostname,
    https: {
      key: fs.readFileSync('var/ssl/whack_chat.key'),
      cert: fs.readFileSync('var/ssl/whack_chat.crt'),
    },
    hot: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: `https://${config.server.hostname}`
      },
      '/socket.io': {
        ws: true,
        target: `https://${config.server.hostname}`
      }
    }
  }
}