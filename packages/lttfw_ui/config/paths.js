const path = require('path')

module.exports = {
  root: path.resolve(__dirname, '..'),
  src: path.resolve(__dirname, '../'),
  build: path.resolve(__dirname, '../dist'),
  public: path.resolve(__dirname, '../public'),
  static: path.resolve(__dirname, '../../../static')
}
