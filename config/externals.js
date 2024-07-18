function externalForMaterialUi({ context, request }, callback) {
  if (/@mui\/material.+/.test(request)) {
    const name = request.replace(/^.*[\\\/]/, '')
    return callback(null, 'root MaterialUI.' + name)
  }
  callback()
}

module.exports = {
  externals: [
    {
      history: 'HistoryLibrary',
      react: 'React',
      'react-dom': 'ReactDOM',
      redux: 'Redux',
      'react-redux': 'ReactRedux',
      '@remix-run/router': 'router',
      'react-router': 'ReactRouter',
      'react-router-dom': 'ReactRouterDOM',
      '@reduxjs/toolkit': 'RTK',
      'reduxjs-toolkit-persist': 'ReduxPersist',
      'redux-state-sync': 'reduxStateSync',
      '@apollo/client': 'ApolloClient',
      'apollo-client': 'ApolloClient',

      '@mui/material': 'MaterialUI',
      '@emotion/react': 'emotionReact',
      '@emotion/styled': 'emotionStyled',

      //'redux-logger': 'reduxLogger',
      //'redux-thunk': 'ReduxThunk',

      jquery: '$',
      axios: 'axios',
      lodash: '_',

      'chroma-js': 'chroma',
      'validate.js': 'validate',
      'string-format': 'stringformat',
      'currency.js': 'currency',
      moment: 'moment',

      i18next: 'i18next',
      'react-i18next': 'ReactI18next',

      json5: 'JSON5',
      'jsonpath-plus': 'JSONPath',
      'libphonenumber-js': 'libphonenumber',
      jsoneditor: 'JSONEditor',

      'react-reflex': 'reactReflex',

      overlayscrollbars: 'OverlayScrollbarsGlobal',
      //'overlayscrollbars-react': 'OverlayScrollbarsReact',

      'ace-builds': 'ace',
      '@lttfw/ckeditor5': 'ckeditor5',
      flatpickr: 'flatpickr',
      uppy: 'Uppy',
      'chart.js': 'Chart',
      select2: '$.fn.select2',
      'jquery-serializejson': '$.fn.serializeJSON',
      'react-axios': 'ReactAxios',

      'socket.io-client': 'io',
      'peerjs': 'Peer',
    },
    externalForMaterialUi
  ]
}
