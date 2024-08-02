import _ from 'lodash'

export default (initialState) => ({
  name: 'settings',
  initialState,
  reducers: {
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
    setSub(state, action) {
      const { payload } = action
      const { key, subKey, value } = payload
      state[key][subKey] = value
    },
    get(state, action) {
      const { payload } = action
      if (Array.isArray(payload)) {
        return _.pickBy(state, (v, k) => {
          return _.includes(payload, k)
        })
      }

      const { key } = payload
      return state[key]
    },
    remove(state, action) {
      const { payload } = action
      if (Array.isArray(payload)) {
        for (let i in payload) {
          const { key } = payload[i]
          delete state[remove]
        }
      } else {
        const { key } = payload
        delete state[remove]
      }
    },
    /*
    showOnly(state, action) {
      const { payload: name } = action

      state.leftSidebar.hidden = true
      state.rightSidebar.hidden = true
      state.videoChat.hidden = true
      state.controlPanel.hidden = true

      state[name].hidden = false
    },
    initLayout(state, action) {
      const { payload: platform } = action
      if (platform == 'mobile') {
        state.leftSidebar.hidden = true
        state.rightSidebar.hidden = true
        state.videoChat.hidden = false
        state.controlPanel.hidden = true
      } else {
        state.leftSidebar.hidden = false
        state.rightSidebar.hidden = false
        state.videoChat.hidden = false
        state.controlPanel.hidden = false
      }
    }
    */
  }
})
