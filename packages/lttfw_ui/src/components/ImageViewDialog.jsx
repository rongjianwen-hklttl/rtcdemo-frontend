import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import ResponsiveView from './ResponsiveView'

export default function ImageViewDialog(props) {
  const { sx, open, setOpen, title, value } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    value
  })

  return (
    <Dialog sx={rootSX} open={open} onClose={handleClose}>
      <DialogTitle>
        <Box className="title">{title}</Box>
        <IconButton className="btn-close" onClick={handleClose}>
          <i className="fa-solid fa-times" />
        </IconButton>
      </DialogTitle>
      <DialogContent className="content">
        <ResponsiveView
          src={value}
          style={{
            width: '100%',
            height: 'calc(90vh - 48px - 45px - 1rem)'
          }}
        />
      </DialogContent>
      <DialogActions>
        <Box className="button-group">
          <Button onClick={handleOpen}>Open</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </DialogActions>
    </Dialog>
  )

  function handleOpen(event) {
    window.open(value, '_blank')
  }

  function handleClose(event, reason) {
    if (reason && reason === 'backdropClick') {
      return
    }

    setOpen(false)
  }
}

export function createRootSX(theme, sx, params) {
  const { value } = params
  const style = _.merge(
    {
      '& .MuiPaper-root': {
        minWidth: '90vw',
        maxWidth: '90vw',
        minHeight: '90vh',
        maxHeight: '90vh'
      },
      '& .MuiDialogTitle-root': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0.5rem'
      },
      '& .MuiDialogTitle-root .title': {
        flex: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      },
      '& .MuiDialogTitle-root .btn-close': {
        alignSelf: 'flex-start',
        width: '1.75rem',
        height: '1.75rem',
        fontSize: '1.2rem'
      },
      '& .MuiDialogContent-root': {
        padding: '0.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      },
      '& .MuiDialogActions-root': {
        padding: '0 0.5rem 0.5rem 0.5rem'
      },
      '& .button-group': {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}