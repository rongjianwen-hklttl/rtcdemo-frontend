import React from 'react'

import { Engine as CEngine } from '@lttfw/core'

import App from './App'
import SignalProvider from './providers/SignalProvider'
import PeerProvider from './providers/PeerProvider'
import StreamProvider from './providers/StreamProvider'

export default class Engine extends CEngine {
  constructor(params = {}) {
    super(params)
  }

  getApp() {
    return (
      <SignalProvider>
        <PeerProvider>
          <StreamProvider>
            <App />
          </StreamProvider>
        </PeerProvider>
      </SignalProvider>
    )
  }
}