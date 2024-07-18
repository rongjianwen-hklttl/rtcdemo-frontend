require('dotenv').config({ path: __dirname + '/../.env' })

const devServer = require('../../../config/devServer')
const { merge: webpackMerge } = require('webpack-merge')
const paths = require('./paths')
const ENV = process.env

module.exports = webpackMerge(devServer, {
  devServer: {
    proxy: {
      '/api': {
        target: ENV.DEVSERVER_PROXY_HOST + '/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
      '/admin-v2/assets': {
        target: ENV.DEVSERVER_PROXY_HOST + '/admin-v2/assets',
        changeOrigin: true,
        pathRewrite: { '^/admin-v2/assets': '' }
      },
      '/admin-v2/vendor': {
        target: ENV.DEVSERVER_PROXY_HOST + '/admin-v2/vendor',
        changeOrigin: true,
        pathRewrite: { '^/admin-v2/vendor': '' }
      },
      '/uploads': {
        target: ENV.DEVSERVER_PROXY_HOST + '/uploads',
        changeOrigin: true,
        pathRewrite: { '^/uploads': '' }
      },
      '/thumbnails': {
        target: ENV.DEVSERVER_PROXY_HOST + '/thumbnails',
        changeOrigin: true,
        pathRewrite: { '^/thumbnails': '' }
      }
    },
    static: {
      directory: paths.static
    },
    historyApiFallback: {
      index: ENV.DEVSERVER_HISTORY_API_FALLBACK_INDEX
    },
    compress: true,
    host: ENV.DEVSERVER_HOST,
    port: ENV.DEVSERVER_PORT,
    hot: true,
    allowedHosts: 'all'
  }
})
