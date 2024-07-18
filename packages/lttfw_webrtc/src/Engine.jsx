import React from 'react'

import { Engine as CEngine } from '@lttfw/core'

import App from './App'
import SignalProvider from './providers/SignalProvider'

export default class Engine extends CEngine {
  constructor(params = {}) {
    super(params)
  }

  getApp() {
    return <SignalProvider><App /></SignalProvider>
  }
}