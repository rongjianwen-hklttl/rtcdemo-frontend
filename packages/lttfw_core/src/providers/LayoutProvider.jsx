import React, { createContext, useContext } from 'react'
const LayoutContext = createContext({})

export default function LayoutProvider(props) {
  const { layout = {}, children } = props

  return (
    <LayoutContext.Provider value={layout}>{children}</LayoutContext.Provider>
  )
}

export function useLayout() {
  return useContext(LayoutContext)
}
