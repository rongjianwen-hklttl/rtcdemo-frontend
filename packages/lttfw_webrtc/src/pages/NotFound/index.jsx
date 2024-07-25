import React from 'react'
import { useSelector } from 'react-redux'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import Header from '../../layouts/common/Header'

export default function NotFound(props) {
  const { sx } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <>
      <Header />
      <Box sx={rootSX}>
        Not found.
      </Box>
    </>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
