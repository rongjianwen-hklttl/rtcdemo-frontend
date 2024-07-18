import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import SharingVideoButton from './SharingVideoButton'
import SharingFileButton from './SharingFileButton'

export default function SharingButtons(props) {
  const { sx } = props
  
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <SharingVideoButton />
      <SharingFileButton />
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0.5rem',

      '& .MuiIconButton-root': {
        width: '2rem',
        height: '2rem',
        fontSize: '1.5rem',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}