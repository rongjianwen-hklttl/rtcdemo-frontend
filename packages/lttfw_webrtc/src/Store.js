import { configureStore, createSlice } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

class Store {
  constructor(params = {}) {
    const {
      initialStates,
      slices,
      middleware,
      enhancers,
      preloadedState = {},
      devTools = true,
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

    this.store = configureStore({
      reducer: this.reducers,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}),
      devTools,
      preloadedState,
      /*enhancers: enhancers
        ? enhancers
        : (defaultEnhancers) => ([...defaultEnhancers])
      */
    })
  }
}

export default Store
