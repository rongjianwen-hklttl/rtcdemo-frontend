import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import string_format from 'string-format'
import { useModal } from 'mui-modal-provider'
import { useTranslation } from 'react-i18next'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'

export default function Init(props) {
    const { avatar } = props

    const me = useSelector((state)=>state.users.me)
    const ws = useSignal()
    const { t } = useTranslation()
    const { roomName, userName } = useParams()
    const { store, slices } = useStore()

    React.useEffect(()=>{
        if (!me.peer) {
            return
        }

        console.debug('init...: ' + me.peer.id)
        init()

        ws.on("room-created", enterRoom)
        ws.on("user-joined", userJoined)
        ws.on("get-users", getUsers)
        ws.on("get-messages", addHistory)
        ws.on("add-message", addMessage)
        ws.on("user-started-sharing", (peerId)=>{
            store.dispatch(slices.sharingVideo.actions.setSharingScreenId(peerId))
        })
        ws.on("user-stopped-sharing", ()=>{
            store.dispatch(slices.sharingVideo.actions.stopSharingVideo())
        })

        ws.on("user-disconnected", ({peerId, userName})=>{
            removePeer(peerId)
            store.dispatch(slices.messages.actions.addMessage({
                user: {
                    peerId,
                    userName,
                    avatar,
                },
                text: 'alert-user-left',
                type: 'alert-template',
            }))
        })
        
        me.peer.on("call", (call) => {
            const { userName } = call.metadata
            //dispatch(addPeerNameAction(call.peer, userName))
            call.answer(me.stream)
            call.on("stream", (peerStream) => {
                store.dispatch(slices.users.actions.updateByPeerId({
                    peerId: call.peer, 
                    stream: peerStream,
                }))
                //dispatch(addPeerStreamAction(call.peer, peerStream))
            })
        })

        return ()=>{
          ws.off("room-created")
          ws.off("user-joined")
          ws.off("get-users")
          ws.off("get-messages")
          ws.off("add-message")
          ws.off("user-started-sharing")
          ws.off("user-stopped-sharing")
          ws.off("user-disconnected")
        }
    }, [me.peer])

    return null;
    
    function init() {
        ws.emit('create-room', {roomId: roomName, peerId: me.peer.id, userName, avatar})
    }

    function enterRoom({roomId, peerId, userName, avatar}) {
        ws.emit("join-room", { roomId, peerId, userName, avatar })
    }

    function userJoined({peerId, userName: name, avatar }) {
        const call = me.peer.call(peerId, me.stream, {
          metadata: {
            userName,
          },
        })
        call.on("stream", (peerStream) => {
            store.dispatch(slices.users.actions.updateByPeerId({
                peerId, 
                stream: peerStream,
                userName: name,
                avatar,
            }))
        })
        store.dispatch(slices.messages.actions.addMessage({
            user: {
                peerId,
                userName: name,
                avatar,
            },
            text: 'alert-user-joined',
            type: 'alert-template',
        }))

        store.dispatch(slices.sharingVideo.actions.userJoined())
        //dispatch(addPeerNameAction(peerId, name));
    }

    function getUsers({roomId, participants, sharingScreenId}) {
        for (let i in participants) {
            if (participants[i].peerId === me.peerId) {
                delete participants[i]
                break
            }
        }
        
        //store.dispatch(slices.sharingVideo.actions.setSharingScreenId(sharingScreenId))
        store.dispatch(slices.users.actions.setList(participants))
    }

    function addHistory(messages) {
        store.dispatch(slices.messages.actions.setList(messages))
    }

    function addMessage(message) {
        store.dispatch(slices.messages.actions.addMessage(message))
    }

    function removePeer(peerId) {
        store.dispatch(slices.users.actions.remove({peerId}))
    }
}