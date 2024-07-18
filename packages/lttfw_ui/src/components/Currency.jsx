import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'
import { currencyFormat } from '../helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

export default function Currency(props) {
  const { sx, value, ...rest } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  return (
    <Box sx={rootSX} {...rest}>
      {currencyFormat(value)}
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge({}, typeof sx === 'function' ? sx(theme) : sx)

  return style
}
