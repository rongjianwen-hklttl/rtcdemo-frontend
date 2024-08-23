import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'

import { addEvent } from '../../helpers'

export default function InitWs(props) {
    const { 
        roomName: currentRoomName,
        userName: currentUserName,
        avatar: currentAvatar
    } = props

    const { store, slices } = useStore()
    const { ws } = useSignal()
    const currentPeer = usePeer()

    function enterRoom(params) {
        //const {roomId, peerId, userName, avatar, constraints} = params
        addEvent(store, slices, 'info', 'ws.received', 'room-created', params)

        addEvent(store, slices, 'success', 'ws.emit', 'join-room', params)
        ws.emit("join-room", params)
    }

    function getStatus(status) {
        addEvent(store, slices, 'info', 'ws.received', 'get-status', status)

        store.dispatch(slices.users.actions.updateMeStatus(status))
    }

    function getUsers(params) {
        const {roomId, participants, sharingScreenId} = params
        addEvent(store, slices, 'info', 'ws.received', 'get-users', params)
        
        const userList = _.cloneDeep(participants)
        const peerIds = []
        for (let i in userList) {
            if (userList[i].peerId === currentPeer.id) {
                delete userList[i]
                break
            }
            userList[i].status = 'init'
            userList[i].refreshStream = 0
            peerIds.push(userList[i].peerId)
        }
        
        store.dispatch(slices.users.actions.setList(userList))
        store.dispatch(slices.peerIds.actions.setList(peerIds))
    }

    function getMessages(messages) {
        addEvent(store, slices, 'info', 'ws.received', 'get-messages', messages)

        store.dispatch(slices.messages.actions.setList(messages))
    }

    function addMessage(message) {
        addEvent(store, slices, 'info', 'ws.received', 'add-message', message)
        
        store.dispatch(slices.messages.actions.addMessage(message))
    }

    function userInfoChanged(params) {
        const {roomId, peerId, constraints} = params
        addEvent(store, slices, 'info', 'ws.received', 'user-info-changed', params)
        
        if (constraints == null && window.__peerStreams__[peerId]) {
            window.__peerStreams__[peerId].getTracks().forEach((track)=>
                track.stop() || window.__peerStreams__[peerId].removeTrack(track)
            )
        }
        store.dispatch(slices.users.actions.updateByPeerId({
            peerId,
            status: 'updated',
            refreshStream: (new Date()).getTime(),
        }))
    }

    function userDisconnected(params) {
        const {peerId, userName, avatar} = params
        addEvent(store, slices, 'info', 'ws.received', 'user-disconnected', params)

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

    function userJoined(params) {
        const {peerId: newUserPeerId, userName: newUserName, avatar: newUserAvatar } = params
        let payload = {
            peerId: newUserPeerId,
            userName: newUserName,
            avatar: newUserAvatar,
            status: 'joined',
            refreshStream: 0,
        }
        addEvent(store, slices, 'info', 'ws.received', 'user-joined', payload)
        store.dispatch(slices.users.actions.updateByPeerId(payload))
        store.dispatch(slices.peerIds.actions.addPeerId(newUserPeerId))
    }

    function userStartedSharing(peerId) {
        store.dispatch(slices.sharingVideo.actions.set({
            key: 'peerId',
            value: peerId,
        }))
    }

    function userStoppedSharing(peerId) {
        store.dispatch(slices.sharingVideo.actions.stopShareScreen())
    }

    function removePeer(peerId) {
       store.dispatch(slices.users.actions.remove({peerId}))
       store.dispatch(slices.peerIds.actions.removePeerId(peerId))
       delete window.__peerStreams__[peerId]
       delete window.__peerCalls__[peerId]
    }
    
    React.useEffect(()=>{
        ws.on("room-created", enterRoom)
        ws.on("get-status", getStatus)
        ws.on("get-users", getUsers)
        ws.on("get-messages", getMessages)
        ws.on("add-message", addMessage)
        ws.on("user-info-changed", userInfoChanged)
        ws.on("user-disconnected", userDisconnected)
        ws.on("user-joined", userJoined)
        ws.on("user-started-sharing", userStartedSharing)
        ws.on("user-stopped-sharing", userStoppedSharing)

        let payload = {
            peerId: currentPeer.id,
            roomId: currentRoomName,
            userName: currentUserName,
            avatar: currentAvatar,
            constraints: {
                video: null,
                audio: null,
            }
        }

        addEvent(store, slices, 'success', 'ws.emit', 'create-room', payload)
        ws.emit('create-room', payload)

        return ()=>{
            ws.off("room-created")
            ws.off("get-status")
            ws.off("get-users")
            ws.off("get-messages")
            ws.off("add-message")
            ws.off("user-info-changed")
            ws.off("user-disconnected")
            ws.off("user-joined")
            ws.off("user-started-sharing")
            ws.off("user-stopped-sharing")
        }
    }, [])
}