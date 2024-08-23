import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { usePeer } from '../../providers/PeerProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

export default function UserCardDebugInfo(props) {
  const { sx, user, stream } = props

  const debugMode = useSelector((state)=>state.events.debugMode)

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return debugMode &&
    <Box sx={rootSX}>
      <Box>(Debug mode)</Box>
      <Box>peerId: {user.peerId}</Box>
      <Box>
        <span>video: {JSON.stringify(!!user.constraints?.video)}</span>
        <span style={{marginLeft: '0.5rem'}}>audio: {JSON.stringify(!!user.constraints?.audio)}</span>
      </Box>
      <Box>stream id: {stream?.id}</Box>
      <Box>status: {user.status}</Box>
    </Box>
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'aqua',
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      zIndex: 9,
      wordBreak: 'break-all',
      position: 'absolute',
      width: 'calc(100% - 4rem)',
      height: 'calc(100% - 2rem)',
      top: '1.5rem',
      left: '2rem',
      right: '2rem',
      fontSize: '11px',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
