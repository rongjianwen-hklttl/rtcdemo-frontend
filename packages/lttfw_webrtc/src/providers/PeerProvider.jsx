import React, { createContext, useContext } from 'react'
import Peer from 'peerjs'
import { v4 as uuidv4 } from 'uuid'

const PeerContext = createContext({})

import {
  PEER_HOST,
  PEER_USERNAME,
  PEER_PASSWORD,
} from '../constants'

export default function PeerProvider(props) {
  const { children } = props

  const config = { 
    iceServers: [{ 
        urls: [`stun:${PEER_HOST}:12779`]
    },{ 
        urls: [`turn:${PEER_HOST}:12779`],
        username: PEER_USERNAME,
        credential: PEER_PASSWORD
    }]
  }
  const peer = new Peer(uuidv4(), {
    secure: true,
    host: PEER_HOST,
    path: "/",
    config,
    debug: 3,
  })

  window.__peer__ = peer
  console.debug('create peer...')
  return (
    <PeerContext.Provider value={peer}>{children}</PeerContext.Provider>
  )
}

export function usePeer() {
  return useContext(PeerContext)
}


