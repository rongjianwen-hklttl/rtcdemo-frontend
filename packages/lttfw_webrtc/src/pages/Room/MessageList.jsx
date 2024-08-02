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

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'

import Message from './Message'

export default function MessageList(props) {
  const { sx } = props

  const sharingVideoId = useSelector((state)=>state.sharingVideo.id)
  const messages = useSelector((state)=>state.messages.list)
  const currentUserName = useSelector((state)=>state.users.userName)
  const currentPeerId = useSelector((state)=>state.users.peerId)
  const currentAvatar = useSelector((state)=>state.users.avatar)

  const [value, setValue] = React.useState('')

  const ws = useSignal()
  const { t } = useTranslation()
  
  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    sharingVideoId,
  })

  const inputRef = React.useRef(null)
  return (
    <Box sx={rootSX}>
      <Box className="message-content">
        { messages.map((m)=>
            <Message
              key={uuidv4()} 
              message={m}
              reversed={m.user.userName == currentUserName}
            />) }
      </Box>
      <Box className="message-footer">
        <Input
          ref={inputRef} 
          fullWidth={true}
          placeholder={t('label-type-a-message')}
          multiline={true}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Box>
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

    setValue('')

    const messageData = {
      user: {
        userName: currentUserName,
        peerId: currentPeerId,
        avatar: currentAvatar,
      },
      text: e.target.value,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    store.dispatch(slices.messages.actions.addMessage(messageData))
    ws.emit('send-message', currentUserName, messageData)
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile, sharingVideoId } = params
  const style = _.merge(
    {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      overflowX: 'hidden',
        
      '& .message-content': {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
      },

      '& .message-footer': {
        padding: '0.5rem',
        backgroundColor: '#f2f2f2',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
