import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import InitPeerUser from './InitPeerUser'

export default function InitPeerUsers(props) {
    const peerIds = useSelector((state)=>state.peerIds.list)

    return peerIds.map((peerId)=><InitPeerUser key={peerId} {...props} peerId={peerId} />)
}