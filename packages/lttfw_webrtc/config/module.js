require('dotenv').config({ path: __dirname + '/../.env' })

const _module = require('../../../config/module')
const { merge: webpackMerge } = require('webpack-merge')
const paths = require('./paths')
const ENV = process.env

module.exports = webpackMerge(_module, {

})