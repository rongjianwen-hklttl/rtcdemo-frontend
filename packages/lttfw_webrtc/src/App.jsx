import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import i18n from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import i18nResources from './i18n/resources'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useEnv } from '@lttfw/core/src/providers/EnvProvider'
import { useEngine } from '@lttfw/core/src/providers/EngineProvider'
import { useMobile } from '@lttfw/core/src/helpers'

import Box from '@mui/material/Box'

import { App as CApp } from '@lttfw/core'
import {
  request,
  request_get,
  request_post,
  getCurrentLang,
} from './helpers'

i18n.use(initReactI18next).init({
  resources: i18nResources,
  lng: getCurrentLang(),
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
})

export default function App(props) {
  const [initStatus, setInitStatus] = React.useState('completed')
  const engine = useEngine()
  const lang = useSelector((state)=>state.settings.lang)

  const { store, slices } = useStore()
  const isMobile = useMobile()

  const rootSX = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
  }

  return (
    <I18nextProvider i18n={ i18n }>
    <Box sx={rootSX}>
    {initStatus == 'initiating' && (
        <div className="loading">
          <div className="sbl-circ pending"></div>
        </div>
      )}
      {initStatus == 'completed' && <CApp {...props} />}
      {initStatus == 'error' && <Box sx={{color: '#d51515', padding: '1rem', flex: 1}}>{error}</Box>}
    </Box>
    </I18nextProvider>
  )
}