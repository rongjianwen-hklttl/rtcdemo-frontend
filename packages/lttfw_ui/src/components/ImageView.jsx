import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useEnv } from '@lttfw/core/src/providers/EnvProvider'
import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import ImageViewDialog from './ImageViewDialog'

export default function ImageView(props) {
  const { sx, value, title, ...rest } = props

  const [open, setOpen] = React.useState(false)
  const { root_url } = useEnv()
  const theme = useTheme()
  const isMobile = useMobile()

  const url = value ? root_url+value : null
  const rootSX = createRootSX(theme, sx, {
    url
  })

  return (
    <>
      <Box sx={rootSX} onClick={handleClick} {...rest}></Box>
      <ImageViewDialog open={open} setOpen={setOpen} title={title} value={url} />
    </>
  )

  function handleClick(e) {
    setOpen(!open)
  }
}

export function createRootSX(theme, sx, params) {
  const { url } = params

  const style = _.merge(
    {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  if (url) {
    style.cursor = 'pointer'
    style.backgroundImage = `url(${url}?preview)`
  }
  return style
}
