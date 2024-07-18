import React from 'react'
import { useSelector } from 'react-redux'

import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useEnv } from '@lttfw/core/src/providers/EnvProvider'

import ImageUploader from './ImageUploader'

export default function UploaderProvider(props) {
	const { uploader = 'ImageUploader', instance_id, ...rest } = props

	const instances = useSelector((state)=>state.uppy.instances)
	const { store, slices } = useStore()
	const { upload_url } = useEnv()

	let Uploader = null
	switch(uploader) {
		case 'ImageUploader': {
			Uploader = ImageUploader
			break
		}
	}

	React.useEffect(()=>{
		if (!instances[instance_id]) {
			store.dispatch(slices.uppy.actions.init({
				instance_id
			}))
		}
	}, [])

	return instance_id && instances[instance_id] && 
		<Uploader
			upload_url={upload_url}
			instance={instances[instance_id]}
			instance_id={instance_id}
			{...rest}
		/>
}
