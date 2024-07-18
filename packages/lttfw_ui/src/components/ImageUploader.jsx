import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import string_format from 'string-format'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useEnv } from '@lttfw/core/src/providers/EnvProvider'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
 
import { OverlayScrollbarsComponent } from "overlayscrollbars-react" 
import ImageView from './ImageView'

import { create_uppy, init_uppy } from '../helpers'

import { upload } from "tauri-plugin-upload-api"
import { open } from '@tauri-apps/api/dialog'

export default function ImageUploader(props) {
	const {
		sx,
		debug = true,
		value = null,
		multiple = true,
		instance_id,
		upload_url,
		onChange,
		...rest
	} = props

	const { store, slices } = useStore()
	
	const instance = useSelector((state)=>state.uppy.instances[instance_id])
	const [uppy, setUppy] = React.useState(null)
	//const [mode, setMode] = useState('uploader')
	const ref = React.useRef()

	const restrictions = props.restrictions ? _.cloneDeep(props.restrictions) : {}
	restrictions.allowedFileTypes = restrictions.allowedFileTypes ? restrictions.allowedFileTypes : ['.jpg', '.jpeg', '.png', '.gif', '.svg']
	restrictions.minNumberOfFiles = restrictions.minNumberOfFiles ? restrictions.minNumberOfFiles : 1
    restrictions.maxNumberOfFiles = restrictions.maxNumberOfFiles ? restrictions.maxNumberOfFiles : (multiple ? null : 1)
    restrictions.maxFileSize = restrictions.maxFileSize ? restrictions.maxFileSize : 1024*1024*8

	React.useEffect(()=>{
		if (!ref.current) {
			return
		}
		
		const uppy = create_uppy({
			target: ref.current, 
			debug, 
			restrictions,
		})

		init_uppy(uppy, {
			endpoint: upload_url
		})

		uppy.on('restriction-failed', (file, error) => {
			store.dispatch(slices.uppy.actions.setRestrictionError({instance_id, file, error: error.message}))
		})

		uppy.on('file-removed', (file) => {
			store.dispatch(slices.uppy.actions.clearRestrictionError({instance_id}))
			store.dispatch(slices.uppy.actions.removeFile({instance_id, id: file.id}))
			
			onChange({target: {value: instance.files.map((o)=>o.response.path).join(',')}})
		})

		uppy.on('file-added', (file) => {
			//uppy.setFileMeta(file.id, { uppy_file_id: file.id })

			store.dispatch(slices.uppy.actions.clearRestrictionError({instance_id}))
			store.dispatch(slices.uppy.actions.addFile({instance_id, file: {...file, data: {}}}))
		})

		uppy.on('upload-error', (file, error, response) => {
			let msg = error.message
			if (response.body.status != 0) {
				msg = response.body.error
			}
			store.dispatch(slices.uppy.actions.setFileError({instance_id, id: file.id, error: msg}))
		})

		uppy.on('upload-success', (file, response) => {
			
		})

		uppy.on('upload-progress', (file, progress) => {
			store.dispatch(slices.uppy.actions.setFileProgress({
				instance_id,
				id: file.id,
				progress: {
					bytesTotal: progress.bytesTotal,
					bytesUploaded: progress.bytesUploaded,
				}
			}))
		})

		uppy.on('progress', (progress) => {
	    	store.dispatch(slices.uppy.actions.setProgress({instance_id, progress}))
		})

		uppy.on('complete', ({ successful, failed }) => {
			uppy.cancelAll()

			for (let i in successful) {
				if (!successful[i].response.body.data) {
					continue
				}

				store.dispatch(slices.uppy.actions.setFileResponse({
					instance_id, 
					id: successful[i].id,
					response: successful[i].response.body.data[0],
				}))
			}
			const val = successful.map((o)=>o.response.body.data[0].url).join(':')
			onChange({target: {value: val}})
		})

		setUppy(uppy)
		
		return ()=>uppy && uppy.close()
	}, [ref])

	const theme = useTheme()
	const isMobile = useMobile()
	const rootSX = createRootSX(theme, sx, {
		isMobile
	})

	const images = value ? value.split(':') : []

	return (
		<Box id={instance_id} sx={rootSX}>
			 <Box ref={ref} className='ImageUploader-drop_zone' >
			 	<Box className='ImageUploader-list'>
					<OverlayScrollbarsComponent defer style={{width: '100%', height: '100%'}}>
						{ images.length > 0 ?
							images.map((image_url)=>
								<Box key={uuidv4()} className='ImageUploader-item'>
									<IconButton className='ImageUploader-remove_button' onClick={(e)=>onRemoveValue(e, image_url)}>
										<i className="fa-solid fa-times"/>
									</IconButton>
									<ImageView className="ImageUploader-preview" value={image_url} />
								</Box>
							) : 
							window.__TAURI_INVOKE__ ?
								<Box component="label" className='ImageUploader-item' htmlFor={'input_'+instance_id} onClick={handleSelect}>
									<Box sx={{textAlign: 'center'}}>拖放圖片到這裡或點擊選擇圖片</Box>
								</Box> : (
								instance.files.length == 0 ?
									<Box component="label" className='ImageUploader-item' htmlFor={'input_'+instance_id}>
										<input
											style={ {display: 'none'} } 
											type="file" 
											multiple={ restrictions.maxNumberOfFiles != 1 } 
											accept={ restrictions.allowedFileTypes.join(',') } 
											id={ 'input_'+instance_id }
											name={ 'input_'+instance_id }
											onChange={ (e)=>onFileChange(e) }
										/>
										<Box sx={{textAlign: 'center'}}>拖放圖片到這裡或點擊選擇圖片</Box>
									</Box> :
									<Box component="label" className='ImageUploader-item' htmlFor={'input_'+instance_id}>
										<Box sx={{textAlign: 'center'}}>{instance.progress}% uploaded</Box>
									</Box>
							)
						}
					</OverlayScrollbarsComponent>
				</Box>
			</Box>
		</Box>
	)

	function handleSelect(e) {
		open({
		  multiple,
		  filters: [{
		    name: 'Image',
		    extensions: ['jpg', 'jpeg', 'png', 'svg', 'bmp', 'webp', 'heic']
		  }]
		}).then((selected)=>{
			const promises = []
			for (let i in selected) {
				const filename = selected[i].replace(/^.*(\\|\/|\:)/, '')
				promises.push(upload(
				  upload_url,
				  selected[i],
				  (progress, total) => {},
				  { 
				  	"authorization": "Bearer " + localStorage.getItem('access_token')
				  },
				))
			}
			Promise.all(promises).then((results)=>{
				console.debug(results)

				const images = []
				for (let i in results) {
					images.push(results[i].url)
				}
				onChange({target: {value: images.join(':')}})
			})
		})
	}

	function onRemoveValue(e, val) {
		let vals = value.split(':')
		for (let i in vals) {
			if (vals[i] == val) {
				vals.splice(i, 1)
				break
			}
		}
		onChange({target: {value: vals.join(':')}})
	}

	function onFileChange(e) {
		const files = Array.from(e.target.files)

		for (let i in files) {
			const file = files[i]
			uppy.addFile({ 
				source: instance_id, 
				name: file.name, 
				type: file.type, 
				data: file
			})
		}
	}
}

export function createRootSX(theme, sx, params) {
  const style = _.merge({
  	'& .ImageUploader-drop_zone': {
	  	width: 'calc(100% - 2px)',
			height: '12rem',
			border: theme.palette.mode === 'dark' ? '1px dotted white' : '1px dotted black',
			position: 'relative',
			overflow: 'hidden',
			display: 'flex',
			flexDirection: 'column',
			boxSizing: 'content-box',
  	},
  	'& .ImageUploader-list': {
  		overflow: 'hidden',
  		height: '12rem',
  	},
  	'& .ImageUploader-item': {
			position: 'relative',
			width: '100%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
  	},
  	'& .ImageUploader-remove_button': {
			position: 'absolute',
			right: '0.5rem',
			top: '0.5rem',
			width: '2rem',
			height: '2rem',
			fontSize: '1.5rem',
  	},
  	'& .ImageUploader-preview': {
			width: 'calc(100% - 2rem)',
			height: 'calc(100% - 2rem)',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'contain',
  	}
  }, typeof sx === 'function' ? sx(theme) : sx)

  return style
}
