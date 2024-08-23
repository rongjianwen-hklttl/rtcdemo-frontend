import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

export default function RefreshStreamButton(props) {
  const { sx, peerId: receiverPeerId } = props

  const currentRoomName = useSelector((state)=>state.users.me.roomName)
  //const currentPeerId = useSelector((state)=>state.users.me.peerId)

  const { store, slices } = useStore()
  const { ws } = useSignal()
  const currentPeer = usePeer()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <IconButton variant="contained" disableRipple={true} onClick={handleClick}>
        <i className='fa-solid fa-refresh' />
      </IconButton>
    </Box>
  )

  function handleClick(e) {
    ws.emit('recall', { roomId: currentRoomName, senderPeerId: currentPeer.id, receiverPeerId })
  }
}

export function createRootSX(theme, sx, params) {
  const { variant } = params
  const style = _.merge(
    {
      '& .MuiButtonBase-root': {
        fontSize: '1.2rem',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}