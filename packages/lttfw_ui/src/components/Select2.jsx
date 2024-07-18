import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import string_format from 'string-format'

import { useMobile, xpath } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
//import Select from '@mui/material/Select'
import Select from 'react-select2-wrapper'

export default function Select2(props) {
  let {
    sx = {},
    theme: select2Theme,
    data,
    defaultValue = null,
    value = null,
    multiple = false,
    options = {},
    moduleName,
    dtSliceName,
    tempdataMapping,
    ...rest
  } = props

  const tempdata = useSelector((state)=>state[dtSliceName].current.tempdata)
  if (tempdata && tempdataMapping && !data) {
		const option = {}
		for (let i in tempdataMapping) {
			const { path, key, format } = tempdataMapping[i]
			option[key] = xpath(tempdata, path)
			if (format) {
				option[key] = string_format(format, option[key])
			}
		}
		data = [option]
	}

  const selectOptions = _.cloneDeep(options)
  if (selectOptions.ajax) {
    selectOptions.ajax = {
      dataType: 'json',
      processResults: function (resp, params) {
        params.page = params.page || 1

        const result = {
          results: resp.data,
          pagination: {
            more: params.page <= resp.last_page
          }
        }
        return result
      },
      ...selectOptions.ajax
    }
  }

  function onUnselect(e) {
    if (!e.params.originalEvent) {
      return
    }
    e.params.originalEvent.stopPropagation()
  }

  const selectProps = {
    style: {
      width: '100%'
    },
    defaultValue,
    data,
    multiple,
    options: {
      ...selectOptions,
      theme: select2Theme,
    },
    onUnselect,
    ...rest
  }

  if (value) {
    selectProps.value = value
  }

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })
  return (
    <Box sx={rootSX}>
      <Select {...selectProps} />
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      flex: 1,
      '& .select2-selection': {
        backgroundColor: 'transparent'
      },
      '& .select2-selection__arrow': {
        height: '39px !important',
        right: '8px !important'
      },
      '& .select2-search__field': {
        marginTop: '0px !important'
      },
      '& .select2-selection__choice': {
        marginTop: '1px !important',
        marginBottom: '1px !important'
      },
      '& .select2-selection--single': {
        height: '39px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      '& .select2-selection--multiple': {
        minHeight: '39px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )
  return style
}
