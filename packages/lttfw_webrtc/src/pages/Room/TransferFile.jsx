import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'

import { useMobile } from '@lttfw/core/src/helpers'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'

export default function TransferFile(props) {
  const { sx, inputProps, close } = props

  const userList = useSelector((state)=>state.users.list)  
  const currentUserName = useSelector((state)=>state.users.me.userName)
  const currentRoomName = useSelector((state)=>state.users.me.roomName)
  const currentAvatar = useSelector((state)=>state.users.me.avatar)

  const { store, slices } = useStore()
  const { ws } = useSignal()
  const currentPeer = usePeer()
  
  return (
    <Input {...inputProps} onChange={handleFileChange} sx={sx} />
  )

  function handleFileChange(event) {
    event.preventDefault()

    const file = event.target.files[0]
    const blob = new Blob(event.target.files, { type: file.type })

    const chunkSize = 128 * 1024 // In bytes
    const chunks = Math.ceil(file.size / chunkSize)
    const created_by = currentUserName
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    const fileId = uuidv4()

    const messageData = {
      user: {
        userName: currentUserName,
        peerId: currentPeer.id,
        avatar: currentAvatar,
      },
      file: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      },
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      text: 'alert-user-sent-file',
      type: 'alert-template',
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

    Object.keys(userList).forEach((peerId)=>{
      const conn = currentPeer.connect(peerId, { reliable: true })

      conn.on('open', function() {
/*
        conn.send({
          id: fileId,
          filename: file.name,
          filesize: file.size,
          filetype: file.type,
          created_by,
          created_at,
          type: 'file',
        })

        conn.send({ 
          id: fileId,
          blob, 
          blobLength: file.size,
          chunkIndex: 1,
          numOfChunk: 1,
          filename: file.name,
          filesize: file.size,
          filetype: file.type,
          created_by,
          created_at,
          type: 'chunk',
        })
*/
        for (let i = 0; i < chunks; i++) {
          console.debug('chunkIndex: ' + i)
          const offset = i * chunkSize
          const fileSlice = file.slice(offset, offset + chunkSize)
          conn.send({ 
            id: fileId,
            blob: file.slice(offset, offset + fileSlice.size), 
            blobLength: fileSlice.size,
            chunkIndex: i,
            numOfChunk: chunks,
            filename: file.name,
            filesize: file.size,
            filetype: file.type,
            created_by,
            created_at,
            type: 'chunk',
          })
        }

        close()
      })
    })
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {

    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
