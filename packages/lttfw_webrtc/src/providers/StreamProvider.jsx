import React, { createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

const StreamContext = createContext({})

export default function StreamProvider(props) {
  const { children } = props

  const stream = new MediaStream()

  window.__stream__ = stream
  console.debug('create stream...')
  return (
    <StreamContext.Provider value={stream}>{children}</StreamContext.Provider>
  )
}

export function useStream() {
  return useContext(StreamContext)
}


