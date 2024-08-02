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

import InitCall from './InitCall'
import InitWs from './InitWs'
import InitStream from './InitStream'
import InitMobileStream from './InitMobileStream'
import SyncUserConstraints from './SyncUserConstraints'

import { getDevices, mobileAndTabletCheck } from '../../helpers'

export default function Init(props) {
    const {
        rootName: currentRoomName,
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
          rootName: currentRoomName,
          userName: currentUserName,
          avatar: currentAvatar,
          peerId: currentPeer.id,
          peer: currentPeer,
          stream: null,
          constraints: {},
        }))
    }, [])

    const commonProps = {
        avatar: currentAvatar,
        rootName: currentRoomName,
        userName: currentUserName,
    }
    return <>
        <InitWs {...commonProps} />
        { isMobileDevice ? <InitMobileStream {...commonProps} />
            : <InitStream {...commonProps} />
        }
        <InitCall {...commonProps} />
        <SyncUserConstraints {...commonProps} />
    </>
}