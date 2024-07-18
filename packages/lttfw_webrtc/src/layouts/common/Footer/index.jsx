import React from 'react'
import { useSelector } from 'react-redux'

import _ from 'lodash'
import clsx from 'clsx'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

export default function Footer(props) {
  const { sx, className } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })
  return (
    <Box sx={rootSX}>Copyright @2024 WACHORD All rights reserved.</Box>
  )
}

export function createRootSX(theme, sx, params) {
  const {

  } = params

  const style = _.merge(
    {
      minHeight: 0,
      display: 'flex',
      flexDirectory: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      height: theme.header.height,
      backgroundColor: theme.footer.bgColor,
      color: theme.footer.color,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
