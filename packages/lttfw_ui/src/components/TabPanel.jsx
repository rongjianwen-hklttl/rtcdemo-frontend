import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

export default function TabPanel(props) {
  const { className, sx, children, value, index, ...rest } = props

  const theme = useTheme()
  const isMobile = useMobile()

  const rootSX = createRootSX(theme, sx, {
    value,
    index
  })
  return (
    <Box sx={rootSX} className={className} role="tabpanel" {...rest}>
      {value === index && children}
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { value, index } = params

  const style = _.merge(
    {
      padding: '0.5rem',
      display: value !== index ? 'none' : 'block'
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
