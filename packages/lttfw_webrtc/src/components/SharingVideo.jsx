import React from 'react'
import { useSelector } from 'react-redux'

import { useMobile } from '@lttfw/core/src/helpers'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import Player from './Player'

export default function SharingVideo(props) {
  const { sx } = props

  const sharingVideoId = useSelector((state)=>state.sharingVideo.id)
  const stream = useSelector((state)=>state.sharingVideo.stream)
  const userList = useSelector((state)=>state.users.list)
  const me = useSelector((state)=>state.users.me)
  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
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
      <Player 
        videoRef={videoRef}
        isMe={me.peerId == sharingVideoId} 
        muted={me.peerId == sharingVideoId}
      />
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

      '&:hover .label': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },

      '&:hover .controls': {
        display: 'flex',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
