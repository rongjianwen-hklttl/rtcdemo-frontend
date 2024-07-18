import React, { createContext, useContext } from 'react'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { create_socket } from '../socket'
const SignalContext = createContext({})

export default function SignalProvider(props) {
  const { children } = props

  const { store, slices } = useStore()
  const ws = create_socket(store, slices)
  return (
    <SignalContext.Provider value={ws}>{children}</SignalContext.Provider>
  )
}

export function useSignal() {
  return useContext(SignalContext)
}
