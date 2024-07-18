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
    startSharingVideo(state, action) {
      const { peerId, stream } = action.payload
      state.id = peerId
      state.stream = stream
    },
    stopSharingVideo(state, action) {
      state.id = null
      state.stream = null
    },
    setSharingScreenId(state, action) {
      const { payload } = action
      state.id = payload
    },
    userJoined(state, action) {
      if (state.id && state.stream) {
        state.forceRefresh = Math.floor(new Date().getTime())
      }
    },
  }
})
