import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'

export default function InitWs(props) {
    const { 
        roomName: currentRoomName,
        userName: currentUserName,
        avatar: currentAvatar
    } = props

    const { store, slices } = useStore()
    const ws = useSignal()
    const currentPeer = usePeer()

    function enterRoom({roomId, peerId, userName, avatar, constraints}) {
        ws.emit("join-room", { roomId, peerId, userName, avatar, constraints })
    }

    function getStatus(status) {
        store.dispatch(slices.users.actions.updateMeStatus(status))
    }

    function getUsers({roomId, participants, sharingScreenId}) {
        const userList = _.cloneDeep(participants)
        for (let i in userList) {
            if (userList[i].peerId === currentPeer.id) {
                delete userList[i]
                break
            }
        }
        
        store.dispatch(slices.users.actions.setList(userList))
    }

    function userInfoChanged({roomId, peerId, constraints}) {
        store.dispatch(slices.users.actions.updateByPeerId({
            peerId,
            constraints
        }))
    }

    function userDisconnected({peerId, userName, avatar}) {
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
    }

    function removePeer(peerId) {
       store.dispatch(slices.users.actions.remove({peerId})) 
    }
    
    React.useEffect(()=>{
        ws.on("room-created", enterRoom)
        ws.on("get-status", getStatus)
        ws.on("get-users", getUsers)
        ws.on("user-info-changed", userInfoChanged)
        ws.on("user-disconnected", userDisconnected)

        ws.emit('create-room', {
            peerId: currentPeer.id,
            roomId: currentRoomName,
            userName: currentUserName,
            avatar: currentAvatar,
            constraints: {
                video: null,
                audio: null,
            }
        })

        return ()=>{
            ws.off("room-created")
            ws.off("get-status")
            ws.off("user-joined")
            ws.off("user-info-changed")
        }
    }, [])
}