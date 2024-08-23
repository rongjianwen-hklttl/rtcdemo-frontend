import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import Controls from './Controls'

export default function LsControlPanel(props) {
  const { sx } = props

  const currentLsTab = useSelector((state)=>state.settings.currentLsTab)

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    currentLsTab,
  })

  return (
    <Box sx={rootSX}>
      <Controls />
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const {
    isMobile,
    currentLsTab,
  } = params

  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      display: currentLsTab !== 'lsControlPanel' ? 'none' : 'flex',
      flexDirection: 'column',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
