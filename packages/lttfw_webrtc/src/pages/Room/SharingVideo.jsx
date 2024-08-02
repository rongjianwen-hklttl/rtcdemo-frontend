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

import VideoPlayer from './VideoPlayer'

export default function SharingVideo(props) {
  const { sx } = props

  const { roomName, userName } = useParams()
  const { store, slices } = useStore()
  const user = useSelector((state)=>state.sharingVideo)

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <VideoPlayer user={user} />
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      marginBottom: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
