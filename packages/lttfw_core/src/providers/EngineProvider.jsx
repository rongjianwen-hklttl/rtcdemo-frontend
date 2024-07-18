import React, { createContext, useContext } from 'react'
const EngineContext = createContext({})

export default function EngineProvider(props) {
  const { engine = {}, children } = props

  return (
    <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>
  )
}

export function useEngine() {
  return useContext(EngineContext)
}
