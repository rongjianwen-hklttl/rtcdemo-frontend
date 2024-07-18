import _ from 'lodash'

export default (initialState) => ({
  name: 'files',
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
      state.list = [...state.list, ...payload]
    },
    addFile(state, action) {
      const { payload } = action
      state.list.push(payload)
    },
  }
})
