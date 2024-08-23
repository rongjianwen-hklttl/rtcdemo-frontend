import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'

import { addEvent } from '../../helpers'

export default function InitRecall(props) {
    const { 
        roomName: currentRoomName,
        userName: currentUserName,
        avatar: currentAvatar
    } = props

    const peerIds = useSelector((state)=>state.peerIds.list)

    const { store, slices } = useStore()
    const { ws } = useSignal()
    const currentPeer = usePeer()
    
    function recall({roomId, senderPeerId, receiverPeerId}) {
        if (receiverPeerId != currentPeer.id) {
            return
        }

        addEvent(store, slices, 'warning', 'recall', 'close', null)

        if (window.__peerCalls__[senderPeerId]) {
            window.__peerCalls__[senderPeerId].close()
        }

        store.dispatch(slices.users.actions.updateByPeerId({
            peerId: senderPeerId,
            status: 'updated',
            refreshStream: (new Date()).getTime(),
        }))
    }

    React.useEffect(()=>{
        ws.on("require-recall", recall)

        return ()=>{
            ws.off("require-recall")
        }
    }, [peerIds])
}