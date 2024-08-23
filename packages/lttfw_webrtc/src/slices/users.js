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
    reset(state, action) {
      const stream = state.me.stream
      if (stream) {
        const tracks = stream.getTracks()
        tracks.forEach(track => track.stop())
      }

      state.list = {}
      state.me = {}
    },
    resetPeerUsersStatus(state, action) {
      console.debug('dispatch: resetPeerUsersStatus....')
      const { status, refreshStream } = action.payload

      if (typeof status !== 'undefined') {
        for (let i in state.list) {
          state.list[i].status = status 
        }
      }

      if (typeof refreshStream !== 'undefined') {
        for (let i in state.list) {
          state.list[i].refreshStream = refreshStream 
        }
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
    updateMeStatus(state, action) {
      const { payload: status } = action
      state.me.status = status
    },
    updateMeConstraintVideo(state, action) {
      const { payload } = action
      if (payload === null) {
        state.me.constraints.video = undefined
      } else {
        state.me.constraints.video = payload
      }
    },
    updateMeConstraintAudio(state, action) {
      const { payload } = action
      if (payload === null) {
        state.me.constraints.audio = undefined
      } else {
        state.me.constraints.audio = payload
      }
    },
    updateByPeerId(state, action) {
      const { payload } = action
      const { peerId, ...rest } = payload
      state.list[peerId] = {
        peerId,
        ...state.list[peerId],
        ...rest,
      }
    },
    setByPeerId(state, action) {
      const { payload } = action
      const { peerId, key, value } = payload
      state.list[peerId][key] = value
    },
    remove(state, action) {
      const { payload } = action
      const { peerId } = payload
      delete state.list[peerId]
    }
  }
})
