import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'

import VideoPlayer from './VideoPlayer'
import VideoSelector from './VideoSelector'
import AudioSelector from './AudioSelector'
import VideoToggler from './VideoToggler'
import AudioToggler from './AudioToggler'
import RefreshStreamButton from './RefreshStreamButton'
import RefreshPeerStreamsButton from './RefreshPeerStreamsButton'

import DeviceStatus from './DeviceStatus'
import UserCardDebugInfo from './UserCardDebugInfo'

export default function UserCardCover(props) {
  const { sx, cover } = props

  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    cover,
  })

  return (
    <Box sx={rootSX}>
      <Box className="cover-image"></Box>
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { cover } = params

  const style = _.merge(
    {
      position: 'absolute',
      top: 32,
      bottom: 30,
      zIndex: 1,

      width: '100%',
      height: 'calc(100% - 32px - 30px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      
      '& .cover-image': {
        width: '100%',
        height: '100%',
        padding: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'contain',
        backgroundImage: cover ? `url(${cover})` : 'none',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
