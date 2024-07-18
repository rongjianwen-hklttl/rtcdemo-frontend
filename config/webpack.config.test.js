const { merge: webpackMerge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    main: './test'
  },
  output: {
    filename: '[name].development.js'
  }
})
