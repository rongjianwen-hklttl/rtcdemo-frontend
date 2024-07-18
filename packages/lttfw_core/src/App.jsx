import React from 'react'
import { useSelector } from 'react-redux'

import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom'
import ModalProvider from 'mui-modal-provider'
import { ThemeProvider } from '@mui/material/styles'

import { useEngine } from './providers/EngineProvider'
import LayoutProvider from './providers/LayoutProvider'

function Loading(props) {
  return (
    <div className="loading">
      <div className="sbl-circ pending"></div>
    </div>
  )
}

function Error(props) {
  return (
    <div className="error">
      { props.children }
    </div>
  )
}

function Root(props) {
  const { layout } = props
  const routes = useSelector((state) => state.routes)

  const engine = useEngine()
  const Layout = engine.getCurrentLayout()
  const pages = engine.pages

  const children = []
  for (let i in routes) {
    const route = routes[i]
    const { path, page_component } = route
    const Compt = pages[page_component]
      ? pages[page_component]
      : pages.NotImplmented
    const element = Compt ? <Compt /> : <Box>Not implemented.</Box>
    children.push(<Route key={path} path={path} element={element} />)
  }

  return (
      <Layout element={<Routes>{children}</Routes>} />
  )
}

export default function App(props) {
  const themeName = useSelector((state) => state.settings.themeName)
  const layoutName = useSelector((state) => state.settings.layoutName)

  const [initStatus, setInitStatus] = React.useState('initiating')

  const engine = useEngine()  
  engine.setCurrentThemeName(themeName)
  const theme = engine.getCurrentTheme()

  setTimeout(()=>{
    setInitStatus('completed')
  }, 0)

  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <LayoutProvider layout={layoutName}>
          {initStatus == 'initiating' && <Loading />}
          {initStatus == 'completed' && <Root />}
          {initStatus == 'error' && <Error>{error}</Error>}
        </LayoutProvider>
      </ModalProvider>
    </ThemeProvider>
  )
}

