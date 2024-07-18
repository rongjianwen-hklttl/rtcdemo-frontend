export default (initialState) => ({
  name: 'uppy',
  initialState,
  reducers: {
    init(state, action) {
    	const { instance_id } = action.payload
    	state.instances[instance_id] = {
        files: [],
        restrictionErrors: [],
        searching: '',
      }
    },
    addFile(state, action) {
      const { instance_id, file } = action.payload
      state.instances[instance_id].files.push(file) 
    },
    removeFile(state, action) {
      const { instance_id, id } = action.payload
      for (let i in state.instances[instance_id].files) {
        if (state.instances[instance_id].files[i].id == id) {
          state.instances[instance_id].files.splice(i, 1)
          break
        }
      }
    },
    setProgress(state, action) {
      const { instance_id, progress } = action.payload
      state.instances[instance_id].progress = progress
    },
    setFileProgress(state, action) {
      const { instance_id, id, progress } = action.payload
      for (let i in state.instances[instance_id].files) {
        if (state.instances[instance_id].files[i].id == id) {
          state.instances[instance_id].files[i].progress.percentage = Math.round(progress.bytesUploaded / progress.bytesTotal * 100)
          state.instances[instance_id].files[i].progress.bytesTotal = progress.bytesTotal
          state.instances[instance_id].files[i].progress.bytesUploaded = progress.bytesUploaded
          break
        }
      }
    },
    setFileError(state, action) {
      const { instance_id, id, error } = action.payload
      for (let i in state.instances[instance_id].files) {
        if (state.instances[instance_id].files[i].id == id) {
          state.instances[instance_id].files[i].error = error
          break
        }
      }
    },
    setSearching(state, action) {
      const { instance_id, searching } = action.payload
      state.instances[instance_id].searching = searching
    },
    clearRestrictionError(state, action) {
      const { instance_id, file, error } = action.payload
      state.instances[instance_id].restrictionErrors = []
    },
    setRestrictionError(state, action) {
      const { instance_id, file, error } = action.payload
      state.instances[instance_id].restrictionErrors.push({file, error})
    },
    setFileResponse(state, action) {
      const { instance_id, id, response } = action.payload
      for (let i in state.instances[instance_id].files) {
        if (state.instances[instance_id].files[i].id == id) {
          state.instances[instance_id].files[i].response = response
          break
        }
      }
    },
  }
})