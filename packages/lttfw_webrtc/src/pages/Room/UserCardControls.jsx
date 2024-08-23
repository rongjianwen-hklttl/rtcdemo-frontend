import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useStream } from '../../providers/StreamProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import VideoPlayer from './VideoPlayer'
import VideoSelector from './VideoSelector'
import AudioSelector from './AudioSelector'
import VideoToggler from './VideoToggler'
import AudioToggler from './AudioToggler'
import RefreshStreamButton from './RefreshStreamButton'

import DeviceStatus from './DeviceStatus'

import { mobileAndTabletCheck } from '../../helpers'

export default function UserCardControls(props) {
  const { sx, user, readOnly = false } = props

  const debugMode = useSelector((state)=>state.events.debugMode)
  const { store, slices } = useStore()
  const currentStream = useStream()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    readOnly,
  })

  const isMobileDevice = mobileAndTabletCheck()
  //{ readOnly ? <DeviceStatus className="opt" user={user} stream={stream} /> :
  return (
    <Box sx={rootSX}>
      <Box className="title">{user.userName}</Box> 
        <Box className="opt">
          { readOnly ? null : isMobileDevice ? <VideoToggler /> : <VideoSelector /> }
          { readOnly ? null : isMobileDevice ? <AudioToggler /> : <AudioSelector /> }
          { readOnly && <RefreshStreamButton peerId={user.peerId} /> }
          { debugMode && <IconButton onClick={handleInfo}><i className="fa-solid fa-info" /></IconButton> }
        </Box>
    </Box>
  )

  function handleInfo() {
    console.debug(currentStream.getTracks())
  }
}

export function createRootSX(theme, sx, params) {
  const { readOnly } = params

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
      '&:hover .opt': {
        opacity: !readOnly ? 1 : 0.8,
      },

      '& .opt': {
        display: 'flex',
        flexDirection: 'column',
        opacity: 0.8,
        position: 'absolute',
        right: '0.25rem',
        top: '0.25rem',
      },
      '& .opt .fa-times': {
        fontSize: '50%',
        position: 'absolute',
        right: '-4px',
        bottom: '0px',
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

      '& .opt .MuiIconButton-root': {
        width: '2rem',
        height: '2rem',
      },

      '& .opt .label': {
        display: 'none',
      },

      '& .opt .MuiIconButton-root:hover': {
        backgroundColor: 'rgba(155, 155, 155, 0.5)',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
