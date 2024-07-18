require('dotenv').config({ path: __dirname + '/../.env' })

const resolve = require('../../../config/resolve')
const { merge: webpackMerge } = require('webpack-merge')
const paths = require('./paths')
const ENV = process.env

module.exports = webpackMerge(resolve, {
	
})