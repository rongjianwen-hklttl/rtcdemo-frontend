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

const __peerStreams__ = {}
window.__peerStreams__ = __peerStreams__

export default function InitPeer(props) {
    const { 
        roomName: currentRoomName,
        userName: currentUserName,
        avatar: currentAvatar,
    } = props

    const { ws } = useSignal()
    const { store, slices } = useStore()
    const currentPeer = usePeer()
    const currentStream = useStream()

    React.useEffect(()=>{
        currentPeer.on("call", (call) => {
            const { userName } = call.metadata

            console.debug('On call...')
            console.debug(call.metadata)

            call.answer(currentStream)
            call.on("stream", (peerStream) => {
                let payload = {
                    peerId: call.peer, 
                    status: 'ready',
                    refreshStream: (new Date()).getTime(),
                }
                console.debug('On stream...')
                console.debug(peerStream)

                __peerStreams__[call.peer] = peerStream

                store.dispatch(slices.users.actions.updateByPeerId(payload))
            })
            call.on("close", () => {
                delete __peerStreams__[call.peer]
            })
        })

        return ()=>{
            currentPeer.off("call")
        }
    }, [])
}