import React from 'react'
import { useSelector } from 'react-redux'

import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

import FileList from './FileList'

export default function ReceivedFiles(props) {
  const { sx } = props
  
  const fileListLength = useSelector((state)=>state.files.list.length)
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  return (
    <Box sx={rootSX}>
      <Box>Received files({fileListLength})</Box>
      <FileList />
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      //flex: 'unset',
      minHeight: 0,
      flex: 1,
      overflowY: 'auto',
      position: 'relative',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
