import _ from 'lodash'

export default (initialState) => ({
  name: 'users',
  initialState,
  reducers: {
    init(state, action) {
      const { payload } = action
      for (let i in payload) {
        state[i] = payload[i]
      }
    },
    setList(state, action) {
      const { payload } = action
      state.list = payload
    },
    setMe(state, action) {
      const { payload } = action
      state.me = payload
    },
    updateMe(state, action) {
      const { payload } = action
      if (!state.me) state.me = {}

      for (let i in payload) {
        state.me[i] = payload[i]
      }
    },
    updateByPeerId(state, action) {
      const { payload } = action
      const { peerId, ...rest } = payload
      state.list[peerId] = {
        ...state.list[peerId],
        ...rest,
      }
    },
    remove(state, action) {
      const { payload } = action
      const { peerId } = payload
      delete state.list[peerId]
    }
  }
})
