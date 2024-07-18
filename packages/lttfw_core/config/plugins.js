const plugins = require('../../../config/plugins')
const { merge: webpackMerge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')
const styles = require('./styles')
const scripts = require('./scripts')

const isDev = process.env.NODE_ENV == 'development'

module.exports = webpackMerge(plugins, {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'PARKINGBEES CMS',
      favicon: `${paths.public}/assets/icons/favicon.ico`,
      template: `${paths.public}/index.html`,
      filename: 'index.html',
      inject: 'body',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
        charset: { charset: 'UTF-8' }
      },
      env: process.env,
      styles: styles,
      scripts: scripts
    })
  ].filter(Boolean)
})
  
