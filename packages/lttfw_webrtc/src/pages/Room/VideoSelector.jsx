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

export default function VideoSelector(props) {
  const { sx } = props

  const popupState = usePopupState({ variant: 'popover', popupId: 'videoSelector' })
  const devices = useSelector((state)=>state.devices.video)
  const constraintVideo = useSelector((state)=>state.users.me.constraints?.video)
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
        { !constraintVideo && <i className="fa-solid fa-times" /> }
        <i className="fa-solid fa-camera" />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        { devices.map((d, i)=>
          <MenuItem key={uuidv4()} onClick={(e)=>handleClick(e, d)}>
            <Radio name="video" disableRipple={true} checked={constraintVideo?.deviceId == d.deviceId} />
            <span>{ !_.isEmpty(d.label) ? d.label : `Camera ${i+1}` }</span>
          </MenuItem>
        )}
        <MenuItem onClick={(e)=>handleClick(e, null)}>
          <Radio name="video" disableRipple={true} checked={!constraintVideo} />
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
    store.dispatch(slices.users.actions.updateMeConstraintVideo(d ? {deviceId} : null))
  }
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
