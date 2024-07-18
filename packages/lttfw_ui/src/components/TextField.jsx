import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import copy from 'copy-to-clipboard'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import _TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

export default function TextField(props) {
  const { sx, value = null, onInit = null, onChange, ...rest } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx)

  const [ copied, setCopied ] = React.useState(false)
  return (
    <_TextField InputProps={{endAdornment: (
        <InputAdornment position="start">
          <IconButton onClick={onCopy}>
            { copied ? <i className="fa-solid fa-check" /> : <i className="fa-regular fa-file-lines" /> }
          </IconButton>
        </InputAdornment>
      )}}
      sx={rootSX}
      value={value !== null ? value : ''}
      onChange={handleChange}
      {...rest}
    />
  )

  function onCopy(e) {
    copy(value)
    setCopied(true)
  }

  function handleChange(e) {
    onChange(e)
    setCopied(false)
  }
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
