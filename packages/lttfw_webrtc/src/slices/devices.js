import _ from 'lodash'

export default (initialState) => ({
  name: 'devices',
  initialState,
  reducers: {
    init(state, action) {
      const { payload } = action
      for (let i in payload) {
        state[i] = payload[i]
      }
    },
  }
})
