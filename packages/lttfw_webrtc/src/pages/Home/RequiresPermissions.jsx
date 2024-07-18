import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { useModal } from 'mui-modal-provider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import AlertDialog from '../../components/AlertDialog'
import {
  PEER_HOST,
  PEER_USERNAME,
  PEER_PASSWORD,
} from '../../constants'
export default function RequiresPermissions(props) {
  const { avatar } = props

  const { roomName, userName } = useParams()
  const { store, slices } = useStore()
  const { showModal } = useModal()
  const navigate = useNavigate()

  React.useEffect(()=>{
    const peer = new Peer(uuidv4(), {
      secure: true,
      host: PEER_HOST,
      path: "/",
      config: { 
          iceServers: [{ 
              urls: [`stun:${PEER_HOST}:12779`]
          },{ 
              urls: [`turn:${PEER_HOST}:12779`],
              username: PEER_USERNAME,
              credential: PEER_PASSWORD
          }]
      }
    })

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream)=>{
        store.dispatch(slices.users.actions.updateMe({
          roomName,
          userName,
          peerId: peer.id,
          avatar,
          peer,
          stream,
        }))
      })
      .catch((err)=>{
        if (err instanceof DOMException) {
          if (err.name == 'NotAllowedError') {
            showModal(AlertDialog, {
              title: 'Camera and microphone blocked',
              submit: function() {
                navigate('/')
              },
            })
          } else {
            console.error(err)
          }
        } else {
          console.error(err)
        }
      })
  }, [])
}