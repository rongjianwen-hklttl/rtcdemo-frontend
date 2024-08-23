import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'
import copy from 'copy-to-clipboard'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'

export default function CopyShareLinkButton(props) {
  const currentRoomName = useSelector((state)=>state.users.me.roomName)

  const [dialogOpen, setDialogOpen] = React.useState(false)

  const { store, slices } = useStore()

  function handleClose() {
    setDialogOpen(false)
  }

  function handleClick() {
    setDialogOpen(true)
    copy(window.location.protocol+"//"+window.location.hostname+"/session/"+currentRoomName)
  }

  return <>
    <Button {...props} onClick={handleClick} startIcon={<i className='fa-solid fa-link' />}>
      Copy the share link
    </Button>
    <Dialog
      open={dialogOpen}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>Copy the share link to clipboard successfully.</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </>
}