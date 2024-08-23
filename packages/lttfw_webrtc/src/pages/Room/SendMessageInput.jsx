import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'

export default function SendMessageInput(props) {
  const { sx } = props

  const currentRoomName = useSelector((state)=>state.users.me.roomName)
  const currentUserName = useSelector((state)=>state.users.me.userName)
  //const currentPeerId = useSelector((state)=>state.users.me.peerId)
  const currentAvatar = useSelector((state)=>state.users.me.avatar)

  const [value, setValue] = React.useState('')

  const { ws } = useSignal()
  const currentPeer = usePeer()
  const { t } = useTranslation()
  
  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <Input
        fullWidth={true}
        placeholder={t('label-type-a-message')}
        multiline={true}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={(e)=>sendMessage(value)}>
              <i className='fa-solid fa-play' />
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  )

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleKeyDown(e) {
    if (13 !== e.keyCode) {
      return
    }

    if (_.isEmpty(e.target.value)) {
      e.preventDefault()
      return
    }

    e.preventDefault()

    sendMessage(e.target.value)
  }

  function sendMessage(text) {
    if (_.isEmpty(text)) {
      return
    }

    setValue('')

    const messageData = {
      text,
      user: {
        userName: currentUserName,
        peerId: currentPeer.id,
        avatar: currentAvatar,
      },
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    store.dispatch(slices.events.actions.addEvent({
      severity: 'success',
      type: 'ws.emit',
      title: 'send-message',
      message: {currentRoomName, messageData},
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }))

    store.dispatch(slices.messages.actions.addMessage(messageData))
    ws.emit('send-message', currentRoomName, messageData)
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      flex: 1,
      '& .MuiInputAdornment-root .MuiButtonBase-root': {
        fontSize: '1.2rem',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
