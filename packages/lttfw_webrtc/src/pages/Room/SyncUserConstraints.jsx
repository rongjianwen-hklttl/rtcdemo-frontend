import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'


export default function SyncUserConstraints(props) {
    const { roomName, userName } = props
    const constraints = useSelector((state)=>state.users.me.constraints)
    const peerId = useSelector((state)=>state.users.me.peerId)
    const status = useSelector((state)=>state.users.me.status)

    const ws = useSignal()

    React.useEffect(()=>{
        if (!peerId || status !== 'ready') {
            return
        }

        ws.emit('update-user-info', {
            peerId,
            roomId: roomName,
            constraints,
        })
    }, [constraints, status])
}