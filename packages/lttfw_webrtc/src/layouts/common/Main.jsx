import React from 'react'
import { useSelector } from 'react-redux'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

export default function Main(props) {
  const { sx, element } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      {element}
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

      backgroundColor: theme.main.bgColor,
      color: theme.main.color,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
