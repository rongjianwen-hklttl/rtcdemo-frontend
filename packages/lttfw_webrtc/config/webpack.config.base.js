require('dotenv').config({ path: __dirname + '/../.env' })

const { merge: webpackMerge } = require('webpack-merge')
const baseConfig = require('../../../config/webpack.config.base')

const PKG = require('../package.json')
const paths = require('./paths')
const { externals } = require('./externals')
const { module: _module } = require('./module')

const { plugins } = require('./plugins')
const { resolve } = require('./resolve')
const { devServer } = require('./devServer')

const ENV = process.env
const isDev = ENV.NODE_ENV == 'development'
const basename = ENV.BASENAME ? ENV.BASENAME : ''

module.exports = webpackMerge(baseConfig, {
  //target: 'web',
  context: paths.root,
  entry: {
    main: './src/index'
  },
  output: {
    path: paths.build,
    publicPath: basename,
    filename: '[name].js',
    library: PKG.libname,
    libraryTarget: 'umd'
  },
  module: _module,
  resolve: resolve,
  plugins: plugins,
  devServer: devServer,
  externals: externals,
})


