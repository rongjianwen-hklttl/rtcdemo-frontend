import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import _ from 'lodash'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useModal } from 'mui-modal-provider'
import { useSignal } from '../providers/SignalProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import FileDialog from './FileDialog'

export default function SharingFileButton(props) {
  const { sx } = props

  const { showModal } = useModal()

  const { roomName, userName } = useParams()
  const { store, slices } = useStore()
  const ws = useSignal()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })
  return (
    <IconButton sx={rootSX} onClick={startSharingFile}><i className="fa-solid fa-share-nodes"/></IconButton>
  )

  function startSharingFile() {
    showModal(FileDialog, {})
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {

    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}