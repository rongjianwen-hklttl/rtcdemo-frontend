import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

export default function RefreshPeerStreamsButton(props) {
  const { sx, peerId } = props

  const { store, slices } = useStore()
 
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <IconButton variant="contained" disableRipple={true} onClick={handleClick}>
        <i className='fa-solid fa-group-arrows-rotate' />
      </IconButton>
    </Box>
  )

  function handleClick(e) {
    store.dispatch(slices.users.actions.resetPeerUsersStatus({
      status: 'init',
      refreshStream: (new Date()).getTime(),
    }))
  }
}

export function createRootSX(theme, sx, params) {
  const { variant } = params
  const style = _.merge(
    {
      '& .MuiButtonBase-root': {
        fontSize: '1.2rem',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}