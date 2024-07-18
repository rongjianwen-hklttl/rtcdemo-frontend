import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

function OverlayScrollbars(props) {
  const { style, ...rest } = props

  const theme = useTheme()
  const isMobile = useMobile()

  return isMobile ? (
    <Box style={style}>{props.children}</Box>
  ) : (
    <OverlayScrollbarsComponent
      options={{ scrollbars: { autoHide: 'leave' } }}
      style={style}
      {...rest}
    >
      {props.children}
    </OverlayScrollbarsComponent>
  )
}

export default OverlayScrollbars
