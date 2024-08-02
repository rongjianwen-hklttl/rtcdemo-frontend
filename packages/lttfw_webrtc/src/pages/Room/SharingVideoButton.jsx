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

import { switchStream, startCapture } from '../../helpers'

export default function SharingFileButton(props) {
  const { sx } = props

  const me = useSelector((state)=>state.users.me)

  const { roomName, userName } = useParams()
  const ws = useSignal()
  const { store, slices } = useStore()

  return  (
    <IconButton onClick={handleClick}><i className="fa-solid fa-share-nodes" /></IconButton>
  )

  function handleClick(e) {
    startSharingVideo()
  }

  function startSharingVideo() {
    startCapture({
      video: true,
      audio: true,
    }).then((stream)=>{
      stream.getVideoTracks()[0].addEventListener('ended', ()=>{
        ws.emit("stop-sharing", roomName)
        switchStream(me.stream, me.peer)
        store.dispatch(slices.sharingVideo.actions.stopSharingVideo())
      })

      ws.emit("start-sharing", { peerId: me.peerId, roomId: roomName })

      store.dispatch(slices.sharingVideo.actions.startSharingVideo({
        peerId: me.peerId,
        stream,
      }))

      switchStream(stream, me.peer)
    }).catch((err)=>{
      console.error(err)
    })
  }
}


