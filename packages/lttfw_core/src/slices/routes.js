import _ from 'lodash'

export default (initialState) => ({
  name: 'routes',
  initialState,
  reducers: {
    init(state, action) {
      const { payload } = action

      for (let i in state) {
        delete state[i]
      }
      for (let i in payload) {
        state[i] = _.cloneDeep(payload[i])
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
    }
  }
})
