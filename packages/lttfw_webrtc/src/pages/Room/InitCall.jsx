import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'

export default function InitCall(props) {
    const { 
        roomName: currentRoomName,
        userName: currentUserName,
        avatar: currentAvatar
    } = props

    const currentStream = useSelector((state)=>state.users.me.stream)

    const { store, slices } = useStore()
    const ws = useSignal()
    const currentPeer = usePeer()

    function userJoined({peerId: newUserPeerId, userName: newUserName, avatar: newUserAvatar }) {
        store.dispatch(slices.users.actions.updateByPeerId({
            peerId: newUserPeerId, 
            stream: null,
            userName: newUserName,
            avatar: newUserAvatar,
        }))

        if (!currentStream) {
            return
        }

        const call = currentPeer.call(newUserPeerId, currentStream, {
          metadata: {
            userName: currentUserName,
          },
        })
        call.on("stream", (peerStream) => {
            store.dispatch(slices.users.actions.updateByPeerId({
                peerId: newUserPeerId, 
                stream: peerStream,
            }))
        })
    }

    React.useEffect(()=>{
        ws.on("user-joined", userJoined)

        return ()=>{
            ws.off("user-joined")
        }
    }, [])
}