import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

import VideoToggler from './VideoToggler'
import AudioToggler from './AudioToggler'
import VideoSelector from './VideoSelector'
import AudioSelector from './AudioSelector'
import ShareScreenButton from './ShareScreenButton'
import CopyShareLinkButton from './CopyShareLinkButton'
import ExitButton from './ExitButton'
import ReceivedFiles from './ReceivedFiles'

import { mobileAndTabletCheck } from '../../helpers'

export default function Controls(props) {
  const { sx } = props

  const currentStream = useSelector((state)=>state.users.me.stream)
  //const currentRoomName = useSelector((state)=>state.users.me.roomName)
  //const currentUserName = useSelector((state)=>state.users.me.userName)

  const { store, slices } = useStore()
  const { ws } = useSignal()
  const navigate = useNavigate()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  const isMobileDevice = mobileAndTabletCheck()

  return (
    <Box sx={rootSX}>
      <Stack direction="column" spacing={1}>
        <Box>{ isMobileDevice ? <VideoToggler useLabel={true} variant='contained' /> : <VideoSelector useLabel={true} variant='contained' /> }</Box>
        <Box>{ isMobileDevice ? <AudioToggler useLabel={true} variant='contained' /> : <AudioSelector useLabel={true} variant='contained' /> }</Box>
        <ShareScreenButton variant='contained' color='primary' />
        <CopyShareLinkButton variant='contained' color='primary' />
        <ExitButton variant='contained' color='warning' />
      </Stack>
      <ReceivedFiles />
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const {
    isMobile,
  } = params

  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '0.5rem',

      '& .field': {
        display: 'flex',
        flexDirection: 'column',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
