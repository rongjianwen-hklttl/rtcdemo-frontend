import _ from 'lodash'

export default (initialState) => ({
  name: 'events',
  initialState,
  reducers: {
    init(state, action) {
      const { payload } = action
      for (let i in payload) {
        state[i] = payload[i]
      }
    },
    set(state, action) {
      const { payload } = action
      if (Array.isArray(payload)) {
        for (let i in payload) {
          const { key, value } = payload[i]
          state[key] = value
        }
      } else {
        const { key, value } = payload
        state[key] = value
      }
    },
    setList(state, action) {
      const { payload } = action
      state.list = [...state.list, ...payload]
    },
    addEvent(state, action) {
      const { payload } = action

      if (state.debugMode) {
        state.list.push(payload)
      }
    },
  }
})
