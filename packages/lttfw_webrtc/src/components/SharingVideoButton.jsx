import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import _ from 'lodash'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useModal } from 'mui-modal-provider'
import { useSignal } from '../providers/SignalProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import { switchStream, startCapture } from '../helpers'

export default function SharingVideoButton(props) {
  const { sx } = props

  const me = useSelector((state)=>state.users.me)

  const { roomName, userName } = useParams()
  const { store, slices } = useStore()
  const ws = useSignal()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })
  return (
    <IconButton sx={rootSX} onClick={startSharingVideo}><i className="fa-solid fa-display" /></IconButton>
  )

  function startSharingVideo() {
    startCapture({
      video: true,
      audio: true,
    }).then((stream)=>{
      stream.getVideoTracks()[0].addEventListener('ended', ()=>{
        ws.emit("stop-sharing", roomName)
        switchStream(me.stream, me)
        store.dispatch(slices.sharingVideo.actions.stopSharingVideo())
      })

      ws.emit("start-sharing", { peerId: me.peerId, roomId: roomName })

      store.dispatch(slices.sharingVideo.actions.startSharingVideo({
        peerId: me.peerId,
        stream,
      }))

      switchStream(stream, me)
    }).catch((err)=>{
      console.error(err)
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