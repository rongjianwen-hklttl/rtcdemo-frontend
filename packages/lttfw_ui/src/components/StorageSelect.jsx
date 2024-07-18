import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import string_format from 'string-format'

import { useMobile, xpath } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'

export default function StorageSelect(props) {
  let {
    sx,
    storageName = 'storage',
    value = null,
    path,
    mapping,
    onChange,
    placeholder,
    ...rest
  } = props

  const data = useSelector((state) => xpath(state[storageName], path))
  
  const options = []
  for (let i in data) {
    const option = {}
    for (let j in mapping) {
      option[mapping[j].key] = xpath(data[i], mapping[j].path)
      if (mapping[j].format) {
        option[mapping[j].key] = string_format(mapping[j].format, option[mapping[j].key])
      } else if (mapping[j].ejs) {
        option[mapping[j].key] = option[mapping[j].key]
      }
    }
    options.push(option)
  }

  let exists = false
  for (let i in options) {
    if (value === options[i].value) {
      exists = true
      break
    }
  }
  if (!exists) {
    value = null
  }

  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })
  return (
    <Select
      sx={rootSX}
      displayEmpty
      value={value === null ? '' : value}
      onChange={onChange}
      MenuProps={{
        transitionDuration: 0
      }}
      {...rest}
    >
      <MenuItem value="">
        <em>{ placeholder ? placeholder : t('cms.action.please_select') }</em>
      </MenuItem>
      {options.map((o) => (
        <MenuItem key={uuidv4()} disabled={o.deleted > 0} value={o.value}>
          {o.label}
          {o.deleted > 0 && (
            <Box component="span" class="error">
              {' '}
              (已刪除)
            </Box>
          )}
        </MenuItem>
      ))}
    </Select>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      width: '100%',

      '& .MuiSelect-select': {
        padding: '8px 14px'
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
