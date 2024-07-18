require('dotenv').config({ path: __dirname + '/../.env' })

const styles = require('../../../config/styles')
const { merge: webpackMerge } = require('webpack-merge')
const paths = require('./paths')
const { BASENAME } = process.env

module.exports = styles.map((ff)=>ff.map((f)=>BASENAME+f))
