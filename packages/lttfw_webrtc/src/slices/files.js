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
    clearBlob(state, action) {
      const { payload } = action
      const { id } = payload
      const f = _.find(state.list, (o)=>o.id == id)
      if (!f) {
        return
      }
      f.blob = null
    },
    addFile(state, action) {
      const { payload } = action
      state.list.push(payload)
    },
    updateFile(state, action) {
      const { payload } = action
      const { id } = payload
      const f = _.find(state.list, (o)=>o.id == id)
      if (!f) {
        return
      }
      _.merge(f, payload)
    },
    addChunk(state, action) {
      const { payload } = action
      const { 
        id,
        chunkIndex,
        numOfChunk,
        filename,
        filesize,
        filetype,
        created_by,
        created_at,
      } = payload
      let f = _.find(state.list, (o)=>o.id == id)
      if (!f) {
        f = {
          id,
          filename,
          filesize,
          filetype,
          created_by,
          created_at,
          numOfChunk,
          chunks: []
        }
        state.list.push(f)
      }

      f.chunks.push(chunkIndex)

      f.progress = f.chunks.length / numOfChunk
/*
      if (f.chunks.length != numOfChunk) {
        return
      }

      f.chunks.sort((a,b) => a.chunkIndex - b.chunkIndex)

      const chunks = []
      for (let i in f.chunks) {
        chunks.push(f.chunks[i].chunk)
      }
      f.chunks = null
      f.blob = chunks
*/
    },
  }
})
