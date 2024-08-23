import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'

import { useTranslation } from 'react-i18next'
import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

import TransferFile from './TransferFile'

export default function FileDialog(props) {
  const { sx, ...rest } = props

  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  const holderRef = React.useRef(null)

  return (
    <Dialog
      {...rest}
      fullScreen={isMobile}
      sx={rootSX}
      onClose={handleClose}
      disableEscapeKeyDown
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>{t('label-select-a-file')}</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <label htmlFor="file-upload" className="dropzone">
            <span ref={holderRef}>{t('label-click-here-to-upload')}</span>
            <TransferFile close={props.onClose}
              inputProps={{id: 'file-upload', type: 'file'}}
              sx={{display: 'none'}}
              />
        </label>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )

  function handleClose(event, reason) {
    if (reason && reason === "backdropClick") {
      return
    }
    props.onClose()
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const isDarkMode = theme.palette.mode === 'dark'

  const style = _.merge(
    {
      '& .MuiPaper-root': {
        width: isMobile ? '100vw' : '50vw',
      },
      '& .dropzone': {
        height: '8rem',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.dropzone.border,
      },
      '& .dropzone:hover': {
        color: theme.dropzone.hover.color,
        backgroundColor: theme.dropzone.hover.bgColor,
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
