import React, { createContext, useContext } from 'react'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { create_socket } from '../socket'
const SignalContext = createContext({})

export default function SignalProvider(props) {
  const { children } = props

  const { store, slices } = useStore()
  const [ws, initWs] = React.useState(create_socket(store, slices))

  return (
    <SignalContext.Provider value={{ws, initWs}}>{children}</SignalContext.Provider>
  )
}

export function useSignal() {
  return useContext(SignalContext)
}
