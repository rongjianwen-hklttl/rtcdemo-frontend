import React from 'react'
import { useSelector } from 'react-redux'

import _ from 'lodash'
import clsx from 'clsx'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useEnv } from '@lttfw/core/src/providers/EnvProvider'
import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

export default function AppSidebar(props) {
  const { sx } = props

  const { store, slices } = useStore()
  const env = useEnv()
  const theme = useTheme()
  const isMobile = useMobile()

  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  const optSX = createOptSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX} className="appSidebar">
     
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const {
    isMobile,
  } = params

  const style = _.merge(
    {
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',

      minWidth: theme.appSidebar.width,
      width: theme.appSidebar.width,
      backgroundColor: theme.appSidebar.bgColor,
      color: theme.appSidebar.color,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}

export function createOptSX(theme, sx, params) {
  const {
    isMobile,
  } = params

  const style = _.merge(
    {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}