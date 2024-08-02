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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'

import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'

export default function AudioSelector(props) {
  const { sx } = props

  const popupState = usePopupState({ variant: 'popover', popupId: 'audioSelector' })
  const devices = useSelector((state)=>state.devices.audio)
  const constraintAudio = useSelector((state)=>state.users.me.constraints?.audio)
  const currentStream = useSelector((state)=>state.users.me.stream)
  
  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <IconButton variant="contained" {...bindTrigger(popupState)}>
        { !constraintAudio && <i className="fa-solid fa-times" /> }
        <i className="fa-solid fa-microphone" />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        { devices.map((d, i)=>
          <MenuItem key={uuidv4()} onClick={(e)=>handleClick(e, d)}>
            <Radio name="audio" disableRipple={true} checked={constraintAudio?.deviceId == d.deviceId} />
            <span>{ !_.isEmpty(d.label) ? d.label : `Microphone ${i+1}` }</span>
          </MenuItem>
        )}
        <MenuItem onClick={(e)=>handleClick(e, null)}>
          <Radio name="audio" disableRipple={true} checked={!constraintAudio} />
          <span>None</span>
        </MenuItem>
      </Menu>
    </Box>
  )

  function handleClick(e, d) {
    popupState.close()

    if (currentStream) {
      currentStream.getTracks().forEach(function(track) {
        track.stop()
      })
    }
    const deviceId = d?.deviceId
    store.dispatch(slices.users.actions.updateMeConstraintAudio(d ? {deviceId} : null))
  }
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      '& .fa-times': {
        fontSize: '50%',
        position: 'absolute',
        right: '6px',
        color: 'white',
        bottom: '5px',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}