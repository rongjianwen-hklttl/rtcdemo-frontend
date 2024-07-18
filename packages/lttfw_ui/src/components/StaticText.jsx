import React, { isValidElement } from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

export default function StaticText(props) {
  const { sx = {}, value, children, ...rest } = props

  const theme = useTheme()
  const rootSX = createRootSX(theme, sx)

  return (
    <Box sx={rootSX} {...rest}>
      {typeof value !== 'undefined'
        ? isValidElement(value) || typeof value === 'string' || value === null
          ? value
          : JSON.stringify(value)
        : children}
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      wordBreak: 'break-all'
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
