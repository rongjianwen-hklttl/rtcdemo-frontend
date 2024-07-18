import { configureStore, createSlice } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import storage from 'reduxjs-toolkit-persist/lib/storage'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'reduxjs-toolkit-persist'

class Store {
  constructor(params = {}) {
    const {
      initialStates,
      slices,
      middleware,
      enhancers,
      preloadedState = {},
      devTools = true,
      persist = false,
      persistConfig = {
        key: 'settings',
        storage,
        stateReconciler: autoMergeLevel1
      }
    } = params

    this.slices = {}
    this.reducers = {}
    for (let name in slices) {
      let slice =
        typeof slices[name] === 'function'
          ? createSlice(slices[name](initialStates[name]))
          : slices[name]

      this.slices[name] = slice
      this.reducers[name] = slice.reducer
    }

    this.persistConfig = persistConfig

    this.store = configureStore({
      reducer: persist
        ? persistReducer(this.persistConfig, combineReducers(this.reducers))
        : this.reducers,
      middleware: middleware
        ? middleware
        : (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: {
                /* ignore persistance actions */
                ignoredActions: [
                  FLUSH,
                  REHYDRATE,
                  PAUSE,
                  PERSIST,
                  PURGE,
                  REGISTER
                ]
              }
            }),
      devTools,
      preloadedState,
      /*enhancers: enhancers
        ? enhancers
        : (defaultEnhancers) => ([...defaultEnhancers])
      */
    })

    this.persistor = persist ? persistStore(this.store) : null
  }
}

export default Store
