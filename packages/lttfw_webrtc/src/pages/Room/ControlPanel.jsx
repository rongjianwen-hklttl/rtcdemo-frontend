import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

export default function ControlPanel(props) {
  const { sx } = props

  const hidden = useSelector((state)=>state.settings.controlPanel.hidden)
  const currentTab = useSelector((state)=>state.settings.currentTab)
  
  const sharingVideoId = useSelector((state)=>state.sharingVideo.id)
 
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    currentTab,
    hidden,
  })

  return (
    <Box sx={rootSX}>
      ControlPanel
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const {
    isMobile,
    hidden,
    currentTab,
  } = params

  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      display: isMobile && currentTab !== 'controlPanel' ? 'none' : 
        (hidden ? 'none' : 'flex'),
      flexDirection: 'column',
      padding: '1rem',
      width: '100%',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
