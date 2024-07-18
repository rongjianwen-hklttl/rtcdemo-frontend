import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import copy from 'copy-to-clipboard'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import _Input from '@mui/material/Input'

export default function Input(props) {
  const { sx, value = null, onInit = null, ...rest } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx)

  return (
    <_Input
      sx={rootSX}
      value={value !== null ? value : ''}
      {...rest}
    />
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge({
    '& .MuiIconButton-root': {
      fontSize: '1rem',
      width: '2rem',
      height: '2rem',
    }
  }, typeof sx === 'function' ? sx(theme) : sx)

  return style
}
