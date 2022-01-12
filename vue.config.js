const fs = require('fs')
const config = require('./src/api/config')

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },

  devServer: {
    host: '0.0.0.0',
    public: `https://${config.server.hostname}:8080`,
    https: {
      key: fs.readFileSync('var/ssl/whack_chat.key'),
      cert: fs.readFileSync('var/ssl/whack_chat.crt'),
    },
    hot: true,
    disableHostCheck: true
  }
}