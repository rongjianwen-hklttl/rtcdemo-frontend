import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'

import { getUserMedia, gotStream } from './InitMobileStream'

export default function AudioToggler(props) {
  const { sx } = props

  const constraintVideo = useSelector((state)=>state.users.me.constraints?.video)
  const constraintAudio = useSelector((state)=>state.users.me.constraints?.audio)
  const currentStream = useSelector((state)=>state.users.me.stream)
  const currentPeerId = useSelector((state)=>state.users.me.peerId)
  const currentRoomName = useSelector((state)=>state.users.me.roomName)
  //const currentUserName = useSelector((state)=>state.users.me.userName)

  const { store, slices } = useStore()
  const ws = useSignal()
 
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <IconButton variant="contained" onClick={(e)=>handleClick(e, constraintVideo, !constraintAudio)}>
        { !constraintAudio && <i className="fa-solid fa-times" /> }
        <i className="fa-solid fa-microphone" />
      </IconButton>
    </Box>
  )

  function handleClick(e, facingMode, enableAudio) {
    if (currentStream) {
      currentStream.getTracks().forEach(function(track) {
        track.stop()
      })
    }

    getUserMedia(store, slices, ws, currentRoomName, currentPeerId, facingMode, enableAudio)
  }
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      '& .fa-times': {
        fontSize: '50%',
        position: 'absolute',
        right: '6px',
        color: 'white',
        bottom: '5px',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}