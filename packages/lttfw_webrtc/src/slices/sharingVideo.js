import _ from 'lodash'

export default (initialState) => ({
  name: 'sharingVideo',
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
      const { key, value } = payload
      state[key] = value
    },
    startShareScreen(state, action) {
      const { payload } = action
      for (let i in payload) {
        state[i] = payload[i]
      }
    },
    stopShareScreen(state, action) {
      for (let i in state) {
        state[i] = null
      }
    },
    setSharingScreenId(state, action) {
      const { payload } = action
      state.id = payload
    },
  }
})
