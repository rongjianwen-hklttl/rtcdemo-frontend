import React from 'react'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

import AppSidebar from './AppSidebar'
import Main from './Main'

export default function Content(props) {
  const { sx, element } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  return (
    <Box sx={rootSX}>
      <AppSidebar />
      <Main element={element} />
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      display: 'flex',
      flexDirector: 'column',
      width: '100%',

      backgroundColor: theme.content.bgColor,
      color: theme.content.color,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
