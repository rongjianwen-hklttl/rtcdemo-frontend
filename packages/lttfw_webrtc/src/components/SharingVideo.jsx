import React from 'react'
import { useSelector } from 'react-redux'

import { useMobile } from '@lttfw/core/src/helpers'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

export default function SharingVideo(props) {
  const { sx } = props

  const sharingVideoId = useSelector((state)=>state.sharingVideo.id)
  const stream = useSelector((state)=>state.sharingVideo.stream)
  const userList = useSelector((state)=>state.users.list)
  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })
  const optSX = createOptSX(theme, sx, {
    isMobile
  })
  const videoSX = createVideoSX(theme, sx, {
    isMobile
  })

  const videoRef = React.useRef(null)
  React.useEffect(()=>{
    if (!videoRef.current) {
      return
    }
    if (stream) {
      videoRef.current.srcObject = stream
    } else {
      if (userList[sharingVideoId] && userList[sharingVideoId].stream) {
        videoRef.current.srcObject = userList[sharingVideoId].stream
      }
    }
  }, [stream, sharingVideoId, userList[sharingVideoId]])
  return (
    <Box sx={rootSX}>
      {/*<Box sx={optSX}><IconButton onClick={stopSharingVideo}><i className="fas fa-times" /></IconButton></Box>*/}
      <Box component='video' sx={videoSX} autoPlay={true} ref={videoRef} />
    </Box>
  )

  function stopSharingVideo() {
    store.dispatch(slices.sharingVideo.actions.stopSharingVideo())
  }
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      backgroundColor: '#eee',
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}

export function createOptSX(theme, sx, params) {
  const style = _.merge(
    {
      top: '0.5rem',
      right: '0.5rem',
      position: 'absolute',

      '& .MuiIconButton-root': {
        width: '2rem',
        height: '2rem',
        fontSize: '1rem',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}

export function createVideoSX(theme, sx, params) {
  const style = _.merge(
    {
      width: '100%',
      height: '100%',
      aspectRatio: '16/9',
      maxHeight: '100%',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}