const paths = require('./paths')
const externals = require('./externals')
const _module = require('./module')
const plugins = require('./plugins')
const resolve = require('./resolve')
const devServer = require('./devServer')

const isDev = process.env.NODE_ENV == 'development'

module.exports = {
  //target: 'web',
  context: paths.src,
  entry: {
    main: './index'
  },
  output: {
    path: paths.build,
    publicPath: '/',
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  module: _module.module,
  resolve: resolve.resolve,
  plugins: plugins.plugins,
  devServer: devServer.devServer,
  externals: externals.externals,
}
