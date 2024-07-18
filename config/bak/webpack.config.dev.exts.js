require('dotenv').config({ path: __dirname + '/../.env' })

const webpack = require('webpack')
const { merge: webpackMerge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.dev')
const PKG = require('../package.json')
const paths = require('./paths')
const externals = require('./externals')

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: '[name].development.js'
  },
  externals: externals
})
