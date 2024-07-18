require('dotenv').config({ path: __dirname + '/../.env' })

//const styles = require('../../../config/styles')
const { merge: webpackMerge } = require('webpack-merge')
const paths = require('./paths')
const { BASENAME } = process.env

const styles = [
  [
    'vendor/notosans/notosanstc.css',
    'vendor/notosans/notosanstc.css'
  ],
  [
    'vendor/fontawesome-free-6.3.0-web/css/all.css',
    'vendor/fontawesome-free-6.3.0-web/css/all.min.css'
  ],
]

module.exports = styles.map((ff)=>ff.map((f)=>BASENAME+f))
