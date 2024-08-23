import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { useStream } from '../../providers/StreamProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'

import DeviceLabel from './DeviceLabel'

export default function AudioToggler(props) {
  const { sx, variant, useLabel } = props

  const constraintAudio = useSelector((state)=>!!state.users.me.constraints?.audio)
  //const currentStream = useSelector((state)=>state.users.me.stream)
  const currentRoomName = useSelector((state)=>state.users.me.roomName)
  //const currentUserName = useSelector((state)=>state.users.me.userName)

  const { store, slices } = useStore()
  const { ws } = useSignal()
  const currentStream = useStream()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    variant,
  })

  return (
    <Box sx={rootSX}>
      <IconButton variant="contained" disableRipple={true} onClick={(e)=>handleClick(e, !constraintAudio)}>
        <Box sx={{position: 'relative'}}>
          { !constraintAudio && <i className="fa-solid fa-times" /> }
          <i className="fa-solid fa-microphone" />
        </Box>
        { useLabel && <DeviceLabel className='label' deviceType='audio' deviceId={constraintAudio?.deviceId} /> }
      </IconButton>
    </Box>
  )

  function handleClick(e, enableAudio) {
    currentStream.getTracks().forEach(function(track) {
      track.stop()
    })
    
    store.dispatch(slices.users.actions.updateMeConstraintAudio(enableAudio))
  }
}

export function createRootSX(theme, sx, params) {
  const { variant } = params
  const style = _.merge(
    {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      border: variant === 'contained' ? '1px solid #eee' : 'none',

      '& .MuiButtonBase-root': {
        width: '100%',
        fontSize: '1.2rem',
      },
      '& .label': {
        flex: 1,
        fontSize: '0.85rem',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },

      '& .fa-times': {
        fontSize: '50%',
        position: 'absolute',
        right: '-4px',
        bottom: '0px',
        zIndex: 1,
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}