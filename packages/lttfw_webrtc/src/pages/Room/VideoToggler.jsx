import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Input from '@mui/material/Input'
import Radio from '@mui/material/Radio'

import DeviceLabel from './DeviceLabel'

export default function VideoToggler(props) {
  const { sx, variant, useLabel } = props

  const popupState = usePopupState({ variant: 'popover', popupId: 'videoSelector' })
  const constraintVideo = useSelector((state)=>state.users.me.constraints?.video)
  const currentRoomName = useSelector((state)=>state.users.me.roomName)
  const currentUserName = useSelector((state)=>state.users.me.userName)

  const { store, slices } = useStore()
  const { ws } = useSignal()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    variant,
    useLabel,
  })

  return (
    <Box sx={rootSX}>
      <IconButton disableRipple={true} variant="contained" {...bindTrigger(popupState)}>
        <Box sx={{position: 'relative'}}>
          { !constraintVideo && <i className="fa-solid fa-times" /> }
          <i className="fa-solid fa-camera" />
        </Box>
        { useLabel && <DeviceLabel className='label' deviceType='video' deviceId={constraintVideo} /> }
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={(e)=>handleClick(e, 'user')}>
          <Radio name="video" disableRipple={true} checked={constraintVideo == 'user'} />
          <span>Front camera</span>
        </MenuItem>
        <MenuItem onClick={(e)=>handleClick(e, 'environment')}>
          <Radio name="video" disableRipple={true} checked={constraintVideo == 'environment'} />
          <span>Back camera</span>
        </MenuItem>
        <MenuItem onClick={(e)=>handleClick(e, false)}>
          <Radio name="video" disableRipple={true} checked={_.isEmpty(constraintVideo)} />
          <span>None</span>
        </MenuItem>
      </Menu>
    </Box>
  )

  function handleClick(e, facingMode, enableAudio) {
    popupState.close()

    store.dispatch(slices.users.actions.updateMeConstraintVideo(facingMode))
  }
}

export function createRootSX(theme, sx, params) {
  const { variant } = params
  const style = _.merge(
    {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      border: variant === 'contained' ? '1px solid #eee' : 'none',

      '& .MuiButtonBase-root': {
        width: '100%',
        fontSize: '1.2rem',
      },
      '& .label': {
        flex: 1,
        fontSize: '0.85rem',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },

      '& .fa-times': {
        fontSize: '50%',
        position: 'absolute',
        right: '-4px',
        bottom: '0px',
        zIndex: 1,
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
