import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { usePeer } from '../../providers/PeerProvider'
import { useSignal } from '../../providers/SignalProvider'
import { useStream } from '../../providers/StreamProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import { addEvent } from '../../helpers'

export default function ShareScreenCardControls(props) {
  const { sx, sharingVideoId } = props

  const userConstraints = useSelector((state)=>state.sharingVideo.userConstraints)

  const { store, slices } = useStore()
  const { ws } = useSignal()
  const currentStream = useStream()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <Box className="title"></Box>
      <Box className="opt">
        <IconButton onClick={handleInfo}><i className="fa-solid fa-info" /></IconButton>
        <IconButton onClick={handleClose}><i className="fa-solid fa-xmark" /></IconButton>
      </Box>
    </Box>
  )

  function handleInfo() {
    console.debug(currentStream.getTracks())
  }

  function handleClose() {
    currentStream.getTracks().forEach((track)=>
      track.stop() || currentStream.removeTrack(track)
    )

    store.dispatch(slices.users.actions.updateMe({
      constraints: userConstraints,
    }))
    store.dispatch(slices.sharingVideo.actions.stopShareScreen())
    store.dispatch(slices.users.actions.resetPeerUsersStatus({
      status: 'init',
      refreshStream: (new Date()).getTime(),
    }))
  }
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      width: '100%',
      backgroundColor: 'rgba(200, 200, 200, 0)',
      color: 'white',
      position: 'absolute',
      top: '0',
      display: 'flex',
      flexDirection: 'row',
      zIndex: 2,
      
      '&:hover': {
        backgroundColor: 'rgba(43, 51, 63, 0.7)',
      },

      '& .title': {
        flex: 1,
        textAlign: 'center',
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '--webkit-line-clamp': 1,
        textAlign: 'center',
        padding: '0.25rem 1rem',
      },

      '& .MuiButtonBase-root': {
        color: 'white',
        fontSize: '1.2rem',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
