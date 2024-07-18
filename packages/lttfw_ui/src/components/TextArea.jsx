import React, { isValidElement } from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

export default function TextArea(props) {
  const { sx = {}, value, children, ...rest } = props

  const theme = useTheme()
  const rootSX = createRootSX(theme, sx)

  const input =
    typeof value !== 'undefined'
      ? isValidElement(value) || typeof value === 'string' || value === null
        ? value
        : JSON.stringify(value)
      : children
  return <Box sx={rootSX} {...rest} component="textarea" value={input} />
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      wordBreak: 'break-all',
      color: 'inherit',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#949494',
      backgroundColor: 'inherit',
      resize: 'vertical', 
      outline: '0px none transparent',
      '&:focus': {
        borderColor: theme.palette.primary.main,
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
