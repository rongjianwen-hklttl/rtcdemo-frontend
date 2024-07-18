require('dotenv').config({ path: __dirname + '/../.env' })

const { merge: webpackMerge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const devServer = require('./devServer')

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: '[name].development.js'
  },
})
