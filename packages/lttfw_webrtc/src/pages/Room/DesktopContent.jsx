import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import VideoChatContainer from './VideoChatContainer'

export default function DesktopContent(props) {
  const { sx } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <LeftSidebar />
      <VideoChatContainer />
      <RightSidebar />
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params

  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
