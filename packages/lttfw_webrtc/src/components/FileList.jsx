import React from 'react'
import { useSelector } from 'react-redux'

import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

import FileItem from './FileItem'

export default function FileList(props) {
  const { sx } = props
  
  const fileList = useSelector((state)=>state.files.list)
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  return (
    <Box sx={rootSX}>
      { fileList.map((f)=><FileItem key={uuidv4()} file={f} />) }
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      //flex: 'unset',
      minHeight: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
      margin: isMobile ? '0.5rem' : 'unset',
      maxHeight: isMobile ? '8.5rem' : '16rem',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
