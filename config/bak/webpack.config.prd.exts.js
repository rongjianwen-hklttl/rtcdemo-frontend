require('dotenv').config({ path: __dirname + '/../.env' })

const webpack = require('webpack')
const { merge: webpackMerge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.prd')
const PKG = require('../package.json')
const paths = require('./paths')
const externals = require('./externals')

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
  },
  externals: externals,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    })
  ]
})
