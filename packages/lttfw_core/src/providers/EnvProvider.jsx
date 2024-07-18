import React, { createContext, useContext } from 'react'
const EnvContext = createContext({})

export default function EnvProvider(props) {
  const { env = {}, children } = props

  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>
}

export function useEnv() {
  return useContext(EnvContext)
}
