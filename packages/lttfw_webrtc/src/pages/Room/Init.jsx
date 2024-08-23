import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'

import { useMobile } from '@lttfw/core/src/helpers'

import FileReceiver from './FileReceiver'
import InitWs from './InitWs'
import InitPeer from './InitPeer'
import InitPeerUsers from './InitPeerUsers'
import InitRecall from './InitRecall'
import InitConstraints from './InitConstraints'

import { getDevices, mobileAndTabletCheck } from '../../helpers'

export default function Init(props) {
    const {
        roomName: currentRoomName,
        userName: currentUserName,
    } = useParams()

    const currentPeer = usePeer()
    
    const isMobile = useMobile()
    const { store, slices } = useStore()

    const currentAvatar = 'https://avataaars.io/'+window.location.search
    const isMobileDevice = mobileAndTabletCheck()

    React.useEffect(()=>{
        getDevices({success: (grouped)=>{
            store.dispatch(slices.devices.actions.init(grouped))
        }})

        store.dispatch(slices.users.actions.updateMe({
          roomName: currentRoomName,
          userName: currentUserName,
          avatar: currentAvatar,
          peerId: currentPeer.id,
          constraints: {},
        }))
    }, [])

    const commonProps = {
        avatar: currentAvatar,
        roomName: currentRoomName,
        userName: currentUserName,
    }

    return <>
        <InitWs {...commonProps} />
        <InitPeer {...commonProps} />
        <InitPeerUsers {...commonProps} />
        <InitRecall {...commonProps} />
        <InitConstraints {...commonProps} />
        <FileReceiver />
    </>
}