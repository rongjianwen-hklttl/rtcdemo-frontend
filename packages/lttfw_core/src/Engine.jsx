import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, createBrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  createHttpLink,
  setContext
} from 'apollo-client'
//import { setContext } from '@apollo/client/link/context'

import EngineProvider from './providers/EngineProvider'
import StoreProvider from './providers/StoreProvider'
import EnvProvider from './providers/EnvProvider'
import App from './App'
import NotImplemented from './pages/NotImplemented'

import { fetch as tauri_fetch, Body } from '@tauri-apps/api/http'

export default class Engine {
  constructor(params = {}) {
    const {
      root_url = '',
      api_url = '',
      basename = '',
      env = {},
      store,
      pages,
      components,
      layouts = null,
      layoutName = 'main',
      themes = null,
      themeName = 'main',
      enableStoreProvider = true,
      enablePersistGate = false,
      enableEnvProvider = true,
      enableReduxProvider = true,
      enableApolloProvider = true,
      enableThemeProvider = true,
      enableModalProvider = true
    } = params

    this.root_url = root_url
    this.api_url = api_url
    this.basename = basename
    this.store = store
    this.pages = pages
    this.components = components

    this.apolloClient = this.createApolloClient()

    this.enableStoreProvider = enableStoreProvider
    this.enablePersistGate = enablePersistGate
    this.enableEnvProvider = enableEnvProvider
    this.enableReduxProvider = enableReduxProvider
    this.enableApolloProvider = enableApolloProvider
    this.enableThemeProvider = enableThemeProvider
    this.enableModalProvider = enableModalProvider

    this.themes = {
      main: createTheme()
    }
    for (let i in themes) {
      this.themes[i] = createTheme(themes[i])
    }
    this.setCurrentThemeName(themeName)

    this.layouts = {
      none: function (props) {
        return props.children
      }
    }
    for (let i in layouts) {
      this.layouts[i] = layouts[i]
    }
    this.setCurrentLayoutName(layoutName)

    this.env = env
  }

  withEngineProvider(children) {
    return <EngineProvider engine={this}>{children}</EngineProvider>
  }

  withStoreProvider(children) {
    return <StoreProvider store={this.store}>{children}</StoreProvider>
  }

  withPersistGate(children) {
    return (
      <PersistGate
        loading={this.getPersistGateLoading()}
        persistor={this.store.persistor}
      >
        {children}
      </PersistGate>
    )
  }

  withEnvProvider(children) {
    return <EnvProvider env={this.env}>{children}</EnvProvider>
  }

  withReduxProvider(children) {
    return <ReduxProvider store={this.store?.store}>{children}</ReduxProvider>
  }

  withApolloProvider(children) {
    return (
      <ApolloProvider client={this.apolloClient}>{children}</ApolloProvider>
    )
  }

  withThemeProvider(children) {
    return (
      <ThemeProvider theme={this.getCurrentTheme()}>{children}</ThemeProvider>
    )
  }

  getPersistGateLoading() {
    return (
      <div className="loading">
        <div className="sbl-circ warning"></div>
      </div>
    )
  }

/*
  initRouter(routes) {
    this.routes = []
    for (let i in routes) {
      const { path, page_component, page_props } = routes[i]

      let Compt = this.pages[page_component]
      let ComptProps = page_props
      if (!Compt) {
        Compt = NotImplemented
        ComptProps = {
          route: routes[i]
        }
      }

      this.routes.push({
        path: path,
        element: <Compt {...ComptProps} />
      })
    }

    this.router = createBrowserRouter(this.routes, {
      basename: this.basename
    })
    return this.router
  }
*/

  createApolloClient() {
    const root_url = this.root_url
    const httpLink = createHttpLink({
      uri: root_url+'/api/graphql',
      fetch: this.fetch,
    })

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('access_token')
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })

    const apolloClient = new ApolloClient({
      //connectToDevTools: process.env.NODE_ENV === 'development',
      link: authLink.concat(httpLink),
      cache: new InMemoryCache({
        addTypename: false
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only',
          //errorPolicy: "ignore",
          errorPolicy: 'all'
        },
        query: {
          fetchPolicy: 'network-only',
          //errorPolicy: "ignore",
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    })
    return apolloClient
  }

  fetch(url, init = {}) {
    if (!window.__TAURI_INVOKE__) {
      return fetch(url, init)
    }

    if (init.body) {
      if (typeof init.body === 'string') {
        init.body = Body.text(init.body)
      } else {
        init.body = Body.json(init.body)
      }
    }

    return new Promise((resolve, reject) => {
      tauri_fetch(url, init).then((resp)=>{
        const headers = new Headers()
        for (let i in resp.headers) {
          headers.append(i, resp.headers[i])
        }
        resolve(new Response(JSON.stringify(resp.data), { headers }))
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  request(url, data = {}, {method = 'POST', basename = this.api_url} = {}) {
    return this.fetch(basename+url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+localStorage.getItem('access_token')
      },
      body: data,
    }).then((resp)=>resp.json())
  }

  getApp() {
    return <App />
  }

  getRootElementId() {
    return 'root'
  }

  setCurrentThemeName(themeName) {
    if (typeof this.themes[themeName] !== 'undefined') {
      this.themeName = themeName
    } else {
      this.themeName = 'main'
    }
    return this.themeName
  }

  getCurrentTheme() {
    return this.themes[this.themeName]
      ? this.themes[this.themeName]
      : this.themes.main
  }

  setCurrentLayoutName(layoutName) {
    if (typeof this.layouts[layoutName] !== 'undefined') {
      this.layoutName = layoutName
    } else {
      this.layoutName = 'none'
    }
    return this.layoutName
  }

  getCurrentLayout() {
    return this.layouts[this.layoutName]
      ? this.layouts[this.layoutName]
      : this.layouts.none
  }

  render() {
    let app = this.getApp()

    app = this.withEngineProvider(app)

    if (this.enableStoreProvider) {
      app = this.withStoreProvider(app)
    }

    if (this.enablePersistGate) {
      app = this.withPersistGate(app)
    }

    if (this.enableEnvProvider) {
      app = this.withEnvProvider(app)
    }

    if (this.enableReduxProvider) {
      app = this.withReduxProvider(app)
    }

    if (this.enableApolloProvider) {
      app = this.withApolloProvider(app)
    }

    if (this.enableThemeProvider) {
      app = this.withThemeProvider(app)
    }

    this.store.persistor

    ReactDOM.createRoot(
      document.getElementById(this.getRootElementId())
    ).render(<Router basename={this.basename}>{app}</Router>)
  }
}