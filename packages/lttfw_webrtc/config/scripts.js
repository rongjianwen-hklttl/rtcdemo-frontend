require('dotenv').config({ path: __dirname + '/../.env' })

//const scripts = require('../../../config/scripts')
const { merge: webpackMerge } = require('webpack-merge')
const paths = require('./paths')
const { BASENAME } = process.env

const scripts = [
  [
    'vendor/history@5.3.0/history.development.js',
    'vendor/history@5.3.0/history.production.min.js'
  ],
  [
    'vendor/react@18.2.0/react.development.js',
    'vendor/react@18.2.0/react.production.min.js'
  ],
  [
    'vendor/react-dom@18.2.0/react-dom.development.js',
    'vendor/react-dom@18.2.0/react-dom.production.min.js'
  ],
  [
    'vendor/redux@4.2.1/redux.js',
    'vendor/redux@4.2.1/redux.min.js'
  ],
  [
    'vendor/react-redux@8.0.5/react-redux.js',
    'vendor/react-redux@8.0.5/react-redux.min.js'
  ],
  [
    'vendor/remix-run-router@1.6.1/router.umd.js',
    'vendor/remix-run-router@1.6.1/router.umd.min.js'
  ],
  [
    'vendor/react-router@6.11.1/react-router.development.js',
    'vendor/react-router@6.11.1/react-router.production.min.js'
  ],
  [
    'vendor/react-router-dom@6.11.1/react-router-dom.development.js',
    'vendor/react-router-dom@6.11.1/react-router-dom.production.min.js'
  ],
  [
    'vendor/reduxjs-toolkit@1.9.5/redux-toolkit.umd.js',
    'vendor/reduxjs-toolkit@1.9.5/redux-toolkit.umd.min.js'
  ],
  [
    'vendor/reduxjs-toolkit-persist@7.2.1/redux-persist.js',
    'vendor/reduxjs-toolkit-persist@7.2.1/redux-persist.min.js'
  ],
/*
  [
    'vendor/jquery@3.7.0/jquery.min.js',
    'vendor/jquery@3.7.0/jquery.min.js'
  ],
  [
    'vendor/jquery.serializejson/jquery.serializejson.min.js',
    'vendor/jquery.serializejson/jquery.serializejson.min.js'
  ],
*/
  [
    'vendor/lodash@4.17.21/lodash.js',
    'vendor/lodash@4.17.21/lodash.min.js'
  ],
  [
    'vendor/axios@1.4.0/axios.js',
    'vendor/axios@1.4.0/axios.min.js'
  ],
  [
    'vendor/emotion-react@11.11.0/emotion-react.umd.min.js',
    'vendor/emotion-react@11.11.0/emotion-react.umd.min.js'
  ],
  [
    'vendor/emotion-styled@11.11.0/emotion-styled.umd.min.js',
    'vendor/emotion-styled@11.11.0/emotion-styled.umd.min.js'
  ],
  [
    'vendor/material-ui@5.13.0/material-ui.development.js',
    'vendor/material-ui@5.13.0/material-ui.production.min.js'
  ],

  [
    'vendor/redux-state-sync@3.1.4/syncState.umd.min.js',
    'vendor/redux-state-sync@3.1.4/syncState.umd.min.js'
  ],
  [
    'vendor/apollo-client@3.7.14/apollo-client.development.js',
    'vendor/apollo-client@3.7.14/apollo-client.production.min.js'
  ],

  [
    'vendor/moment@2.29.4/moment.js',
    'vendor/moment@2.29.4/moment.min.js'
  ],
  [
    'vendor/chroma-js@2.4.2/chroma.js',
    'vendor/chroma-js@2.4.2/chroma.min.js'
  ],
 
  [
    'vendor/string-format@2.0.0/string-format.min.js',
    'vendor/string-format@2.0.0/string-format.min.js'
  ],

  [
    'vendor/validate.js@0.13.1/validate.min.js',
    'vendor/validate.js@0.13.1/validate.js'
  ],
 
  [
    'vendor/i18next@23.5.1/i18next.js',
    'vendor/i18next@23.5.1/i18next.min.js'
  ],
  [
    'vendor/react-i18next@13.2.2/react-i18next.js',
    'vendor/react-i18next@13.2.2/react-i18next.min.js'
  ],

  [
    'vendor/socket.io-client@4.7.5/socket.io.js',
    'vendor/socket.io-client@4.7.5/socket.io.min.js',
  ],
  [
    'vendor/peerjs@1.5.4/peerjs.js',
    'vendor/peerjs@1.5.4/peerjs.min.js',
  ],

  [
    'vendor/videojs@8.3.0/video.js',
    'vendor/videojs@8.3.0/video.min.js',
  ],
  
]

module.exports = scripts.map((ff)=>ff.map((f)=>BASENAME+f))