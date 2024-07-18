import React, { createContext, useContext } from 'react'
const StoreContext = createContext({})

export default function StoreProvider(props) {
  const { store = {}, children } = props

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}
