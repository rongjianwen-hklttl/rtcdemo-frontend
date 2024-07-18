import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import clsx from 'clsx'
import string_format from 'string-format'

import { useEngine } from '@lttfw/core/src/providers/EngineProvider'
import { useMobile } from '@lttfw/core/src/helpers'
import StaticText from './StaticText'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

function MoreDialog(props) {
  const { sx, open, setOpen, title, component, props: ComptProps } = props

  const engine = useEngine()
  const { components } = engine
  if (typeof components[component] === 'undefined') {
    console.error(
      string_format("Component with name '{}' was not found.", component)
    )
  }
  const Compt = components[component] ? components[component] : StaticText

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createDialogSX(theme, sx, {
    isMobile
  })

  let value = ComptProps.value
  switch (component) {
    case 'CodeEditor': {
      if (ComptProps.mode == 'json5') {
        value = JSON.parse(value)
      }
      break
    }
  }

  return (
    <Dialog sx={rootSX} open={open} onClose={handleClose}>
      <DialogTitle>
        <Box className="title">{title}</Box>
        <IconButton className="btn-close" onClick={handleClose}>
          <i className="fa-solid fa-times" />
        </IconButton>
      </DialogTitle>
      <DialogContent className="content">
        <Compt
          {...ComptProps}
          value={value}
          className={clsx(ComptProps.className, 'control')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )

  function handleClose(event, reason) {
    if (reason && reason === 'backdropClick') {
      return
    }

    setOpen(false)
  }
}

export function createDialogSX(theme, sx, params) {
  const { isMobile } = params

  const style = _.merge(
    {
      '& .MuiPaper-root': {
        minWidth: isMobile ? '90vw' : '50vw',
        maxWidth: isMobile ? '90vw' : '90vw',
        minHeight: isMobile ? '90vh' : '50vh',
      },
      '& .MuiDialogTitle-root': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0.5rem'
      },
      '& .MuiDialogTitle-root .title': {
        flex: 1
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
      '& .MuiDialogContent-root .control': {
        flex: 1,
        fontSize: '1rem'
      },
      '& .MuiDialogContent-root textarea.control': {
        resize: 'none',
        border: 'none',
        outline: 'none',
        color: 'inherit',
        backgroundColor: 'inherit'
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}

export default function MoreText(props) {
  const { sx, value, title, component, props: ComptProps, ...rest } = props

  const isEmpty = _.isEmpty(value)
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    isEmpty
  })
  return (
    <>
      {!isEmpty && (
        <Button sx={rootSX} variant="link" onClick={handleClick}>
          More
        </Button>
      )}
      <MoreDialog
        open={open}
        setOpen={setOpen}
        title={title}
        component={component}
        props={{ value, ...ComptProps }}
      />
    </>
  )

  function handleClick(e) {
    setOpen(!open)
  }
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      padding: '0.5rem',
      minWidth: 0
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
