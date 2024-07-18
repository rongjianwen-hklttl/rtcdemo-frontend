import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'

import ejs from 'ejs'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'

export default function EJS(props) {
  const { sx, template, value, children, ...rest } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx)

  let __html = null
  if (template) {
    const tpl = ejs.compile(template)
    const data =
      value === null || typeof value === 'undefined'
        ? {}
        : Array.isArray(value)
          ? { value, ...value }
          : typeof value === 'object'
            ? value
            : { value }
    __html = tpl({ ...data, theme })
  }

  return <Box sx={rootSX} {...rest} dangerouslySetInnerHTML={{ __html }}></Box>
}

export function createRootSX(theme, sx, params) {
  const style = _.merge({}, typeof sx === 'function' ? sx(theme) : sx)

  return style
}
