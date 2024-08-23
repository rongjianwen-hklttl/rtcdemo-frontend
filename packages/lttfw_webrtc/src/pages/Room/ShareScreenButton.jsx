import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'
import { useStream } from '../../providers/StreamProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import {
  /*switchStream, */
  startCapture,
  addEvent, 
  isEmptyConstraints,
} from '../../helpers'

export default function ShareScreenButton(props) {
  //const sharingVideoId = useSelector((state)=>state.sharingVideo.peerId)
  //const currentStream = useSelector((state)=>state.users.me.stream)
  const currentRoomName = useSelector((state)=>state.users.me.roomName)
  //const currentUserName = useSelector((state)=>state.users.me.userName)
  const currentConstraints = useSelector((state)=>state.users.me.constraints)
  //const currentPeer = useSelector((state)=>state.users.me.peer)

  const { store, slices } = useStore()
  const { ws } = useSignal()
  const currentPeer = usePeer()
  const currentStream = useStream()

  return  (
    <Button {...props} onClick={startShareScreen} startIcon={<i className="fa-solid fa-share-nodes" />}>Share screen</Button>
  )

  function startShareScreen() {
    startCapture({
      video: true,
      audio: true,
    }).then((displayStream)=>{
      currentStream.getVideoTracks().forEach((track)=>
        track.stop() || currentStream.removeTrack(track)
      )

      const displayStreamTrack = displayStream.getVideoTracks()[0]
      currentStream.addTrack(displayStreamTrack)

      let payload = { peerId: currentPeer.id, roomId: currentRoomName }
      addEvent(store, slices, 'success', 'ws.emit', 'start-sharing', payload)
      ws.emit("start-sharing", payload)

      store.dispatch(slices.users.actions.updateMe({
        constraints: {
          video: 'sharing',
          audio: 'sharing',
        },
        status: 'ready',
        refreshStream: (new Date()).getTime(),
      }))

      store.dispatch(slices.sharingVideo.actions.startShareScreen({
        peerId: currentPeer.id,
        userConstraints: currentConstraints,
      }))

      displayStreamTrack.addEventListener("ended", () => {
        currentStream.removeTrack(displayStreamTrack)

        store.dispatch(slices.users.actions.updateMe({
          constraints: currentConstraints,
        }))

        if (isEmptyConstraints(currentConstraints)) {
          ws.emit('update-user-info', {
            constraints: null,
            stream: null,
            peerId: currentPeer.id,
            roomId: currentRoomName,
          })
        }

        store.dispatch(slices.sharingVideo.actions.stopShareScreen())

        ws.emit("stop-sharing", currentRoomName)
        
      })

/*
      displayStream.getAudioTracks().forEach((track)=>{
        currentStream.addTrack(track)
        track.addEventListener("ended", () => {
          track.stop() || currentStream.removeTrack(track)
        })
      })
*/
    }).catch((err)=>{
      console.error(err)
    })

    /*
    startCapture({
      video: true,
      audio: true,
    }).then((displayStream)=>{
      if (!currentStream) {
        store.dispatch(slices.users.actions.updateMe({
          stream: displayStream,
          constraints: {
            video: true,
            audio: true,
          }
        }))
      }

      store.dispatch(slices.sharingVideo.actions.startShareScreen({
        peerId: currentPeer.id,
        userStream: currentStream,
        displayStream: displayStream,
        userConstraints: currentConstraints,
      }))
    }).catch((err)=>{
      console.error(err)
    })
    */
  }
}


