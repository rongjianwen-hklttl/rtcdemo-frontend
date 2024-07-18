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
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

export default function StorageAutocomplete(props) {
  let { sx, value = null, path, mapping, onChange, ...rest } = props

  const data = useSelector((state) => xpath(state.storage, path))

  const options = []
  for (let i in data) {
    const row = {}
    for (let j in mapping) {
      row[mapping[j].key] = xpath(data[i], mapping[j].path)
      if (mapping[j].format) {
        row[mapping[j].key] = string_format(mapping[j].format, row[mapping[j].key])
      }
    }
    options.push(row)
  }

  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  return (
    <FormControl sx={rootSX}>
      <Autocomplete
        disablePortal
        options={options}
        renderInput={(params) => <TextField {...params} />}
        onChange={(e, root)=>onChange({...e, target: {...e.target, value: root.value}})}
      />
    </FormControl>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      '& .MuiAutocomplete-root .MuiOutlinedInput-root': {
        padding: '1px',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
