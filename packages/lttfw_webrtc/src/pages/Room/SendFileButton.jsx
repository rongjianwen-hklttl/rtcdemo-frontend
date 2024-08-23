import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useModal } from 'mui-modal-provider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import FileDialog from './FileDialog'

export default function SendFileButton(props) {
  const { sx } = props

  const { showModal } = useModal()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })
  
  return (
    <Box sx={rootSX}>
      <IconButton onClick={handleClick}><i className="fa-solid fa-paperclip" /></IconButton>
    </Box>
  )

  function handleClick() {
    showModal(FileDialog, {})
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params

  const style = _.merge(
    {
      fontSize: '1.2rem',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
