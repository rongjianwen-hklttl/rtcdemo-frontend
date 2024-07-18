require('dotenv').config({ path: __dirname + '/../.env' })

const scripts = require('../../../config/scripts')
const { merge: webpackMerge } = require('webpack-merge')
const paths = require('./paths')
const { BASENAME } = process.env

module.exports = scripts.map((ff)=>ff.map((f)=>BASENAME+f))
