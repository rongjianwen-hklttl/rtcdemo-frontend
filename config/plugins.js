const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDev = process.env.NODE_ENV == 'development'

module.exports = {
  plugins: [
    isDev && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ].filter(Boolean)
}