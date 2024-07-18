require('dotenv').config({ path: __dirname + '/../.env' })

const externals = require('../../../config/externals')
const { merge: webpackMerge } = require('webpack-merge')
const paths = require('./paths')
const ENV = process.env

module.exports = webpackMerge(externals, {

})