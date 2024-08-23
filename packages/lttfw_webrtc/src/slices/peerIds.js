import _ from 'lodash'

export default (initialState) => ({
  name: 'peerIds',
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
    addPeerId(state, action) {
      const { payload: peerId } = action
      state.list.push(peerId)
    },
    removePeerId(state, action) {
      const { payload: peerId } = action
      for (let i in state.list) {
        if (state.list[i] === peerId) {
          state.list.splice(i, 1)
          break
        }
      }
    },
  }
})
