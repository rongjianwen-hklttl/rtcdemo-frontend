import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import SharingVideoButton from './SharingVideoButton'

export default function SharingButtons(props) {
  const { sx } = props

  const { roomName, userName } = useParams()
  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <SharingVideoButton />
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { cover } = params

  const style = _.merge(
    {
      minHeight: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
