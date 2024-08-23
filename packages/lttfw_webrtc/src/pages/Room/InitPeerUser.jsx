import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { usePeer } from '../../providers/PeerProvider'
import { useSignal } from '../../providers/SignalProvider'
import { useStream } from '../../providers/StreamProvider'

import { addEvent } from '../../helpers'

const __peerCalls__ = {}
window.__peerCalls__ = __peerCalls__

export default function InitPeerUser(props) {
    const { 
        roomName: currentRoomName,
        userName: currentUserName,
        avatar: currentAvatar,
        peerId,
    } = props

    const peerUser = useSelector((state)=>state.users.list[peerId])

    const { store, slices } = useStore()
    const { ws } = useSignal()
    const currentPeer = usePeer()
    const currentStream = useStream()

    React.useEffect(()=>{
        if (!_.includes(['init', 'joined', 'updated'], peerUser.status)) {
            return
        }

        if (__peerCalls__[peerId]) {
            __peerCalls__[peerId].close()
            delete __peerCalls__[peerId]
        }

        if (currentStream.active) {
            const call = currentPeer.call(peerId, currentStream, {
                metadata: {
                    userName: currentUserName,
                }
            })
            __peerCalls__[peerId] = call
        }
        
        store.dispatch(slices.users.actions.updateByPeerId({
            peerId: peerId,
            status: 'ready',
        }))

    }, [peerUser.refreshStream])
}