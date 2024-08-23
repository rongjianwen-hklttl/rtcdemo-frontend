import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { useStream } from '../../providers/StreamProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'

import { create_socket } from '../../socket'

export default function ExitButton(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const { store, slices } = useStore()
  const { ws, initWs } = useSignal()
  const navigate = useNavigate()
  const currentStream = useStream()

  return <>
    <Button {...props} onClick={handleClick} startIcon={<i className='fa-solid fa-right-from-bracket' />}>
      Exit
    </Button>
    <Dialog
      open={dialogOpen}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>Are you sure you want to exit?</DialogTitle>
      <DialogActions>
        <Button onClick={handleYes}>Yes</Button>
        <Button onClick={handleNo}>No</Button>
      </DialogActions>
    </Dialog>
  </>

  function handleClick() {
    setDialogOpen(true)
  }

  function handleClose(e) {
    setDialogOpen(false)
  }

  function handleYes(e) {
    setDialogOpen(false)

    ws.close()
    initWs(create_socket(store, slices))

    currentStream.getTracks().forEach(track =>
      track.stop() || currentStream.removeTrack(track)
    )
    
    setTimeout(()=>{
      navigate('/')
    }, 100)
  }

  function handleNo(e) {
    setDialogOpen(false)
  }
}