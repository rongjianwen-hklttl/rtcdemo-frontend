import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'
import rundef from 'rundef'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import Flatpickr from 'react-flatpickr'

export default function DatetimePicker(props) {
  let {
    sx,
    mode,
    theme: flatpickrTheme,
    value,
    onChange,
    onInit,
    options,
    plugins,
    ...rest
  } = props
  
  const flatpickrOptions = rundef({
    disableMobile: true,
    enableTime: false,
    enableSeconds: false,
    time_24hr: true,
    mode,
    theme: flatpickrTheme,
    ...options,

    parseDate: (datestr, format) => {
      return moment(datestr).toDate()
    },
    formatDate: (date, format, locale) => {
      // locale can also be used
      return moment(date).format(format)
    }
  })

  if (!flatpickrOptions.dateFormat) {
    if (flatpickrOptions.enableTime && flatpickrOptions.enableSeconds) {
      flatpickrOptions.dateFormat = 'YYYY-MM-DD HH:mm:ss'
    } else if (flatpickrOptions.enableTime) {
      flatpickrOptions.dateFormat = 'YYYY-MM-DD HH:mm'
    } else {
      flatpickrOptions.dateFormat = 'YYYY-MM-DD'
    }
  }

  function handleChange(selectedDates, dateStr, instance) {
    //let val = mode == 'range' ? dates.join(',') : dates[0]
    onChange({
      target: { value: dateStr }
    })
  }
  
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  function render({defaultValue, value, ...props}, ref) {
    if (mode === 'range' && Array.isArray(value)) {
      value = value.join(' to ')
    }
    return (
      <Box sx={rootSX}>
        <TextField
          value={value ? value : ''}
          inputRef={ref}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <i className="fa-solid fa-calendar-days"></i>
              </InputAdornment>
            )
          }}
        />
      </Box>
    )
  }

  if (mode === 'range'&& typeof value === 'string') {
    value = value.split(' to ')
  }

  return (
    <Flatpickr
      options={flatpickrOptions}
      value={value}
      render={render}
      onChange={handleChange}
    />
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',

      '& .MuiTextField-root': {
        flex: 1,
        '& input': {
          padding: '8px',
          appearance: 'textfield'
        }
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
