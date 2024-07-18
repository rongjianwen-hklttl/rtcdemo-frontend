import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import { useMobile } from '@lttfw/core/src/helpers'
import { useSignal } from '../providers/SignalProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'

import Message from './Message'

export default function MessageList(props) {
  const { sx } = props

  const { roomName, userName } = useParams()

  const sharingVideoId = useSelector((state)=>state.sharingVideo.id)
  const me = useSelector((state)=>state.users.me)
  const messages = useSelector((state)=>state.messages.list)
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
        { messages.map((m)=><Message key={uuidv4()} message={m} reversed={m.user.userName == userName} />) }
      </Box>
      <Box className="message-footer">
        <Input ref={inputRef} fullWidth={true} placeholder={t('label-type-a-message')} multiline={true} value={value} onChange={handleChange} onKeyDown={handleKeyDown} />
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
    e.preventDefault()
    setValue('')

    const messageData = {
      user: {
        userName: me.userName,
        peerId: me.peerId,
        avatar: me.avatar,
      },
      text: e.target.value,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    store.dispatch(slices.messages.actions.addMessage(messageData))
    ws.emit('send-message', roomName, messageData)
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile, sharingVideoId } = params
  const style = _.merge(
    {
      padding: isMobile ? 0 : '0 0.5rem 0 0.5rem',
      minWidth: isMobile ? '100%' : '20rem',
      maxWidth: isMobile ? '100%' : '20rem',
      minHeight: 0,
      height: isMobile ? '100%' : 'auto',

      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      overflowX: 'hidden',
      boxShadow: '-2px 0px 2px 0px #f2f2f2',
        
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
