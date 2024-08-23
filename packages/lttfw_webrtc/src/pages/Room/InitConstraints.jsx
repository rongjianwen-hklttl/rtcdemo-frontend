import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'
import { useStream } from '../../providers/StreamProvider'

import {
    addEvent,
    devicesGrouped,
    mobileAndTabletCheck,
    isEmptyConstraints,
    onStreamChanged,
} from '../../helpers'

export default function InitConstraints(props) {
    const { 
        roomName: currentRoomName,
        userName: currentUserName,
        avatar: currentAvatar
    } = props

    const constraintVideo = useSelector((state)=>state.users.me.constraints?.video)
    const constraintAudio = useSelector((state)=>state.users.me.constraints?.audio)

    const { store, slices } = useStore()
    const { ws } = useSignal()
    const currentPeer = usePeer()
    const currentStream = useStream()
    const isMobileDevice = mobileAndTabletCheck()

    React.useEffect(()=>{
        if (constraintVideo === 'sharing' && constraintAudio === 'sharing') {
            store.dispatch(slices.users.actions.resetPeerUsersStatus({
                status: 'init',
                refreshStream: (new Date()).getTime(),
            }))
            return
        }

        const constraints = {
            video: isMobileDevice ? (constraintVideo ? { facingMode: { exact: constraintVideo } } : false) : 
                (constraintVideo?.deviceId ? { deviceId: { exact: constraintVideo.deviceId } } : false),
            audio: isMobileDevice ? constraintAudio : 
                (constraintAudio?.deviceId ? { deviceId: { exact: constraintAudio.deviceId } } : false),
        }
        const userConstraints = {}
        Object.keys(constraints).forEach(k => constraints[k] && (userConstraints[k] = constraints[k]))

        console.debug('InitConstraints....', userConstraints)

        if (isEmptyConstraints(userConstraints)) {
            currentStream.getTracks().forEach((track)=>
              track.stop() || currentStream.removeTrack(track)
            )
            store.dispatch(slices.users.actions.updateMe({
                refreshStream: 0,
            }))

            ws.emit('update-user-info', {
                constraints: null,
                stream: null,
                peerId: currentPeer.id,
                roomId: currentRoomName,
            })
                
            /*
            store.dispatch(slices.users.actions.resetPeerUsersStatus({
                status: 'init',
                refreshStream: (new Date()).getTime(),
            }))
            */
            return
        }

        navigator.mediaDevices.getUserMedia(userConstraints).then((userStream)=>{
            currentStream.getTracks().forEach((track)=>
              track.stop() || currentStream.removeTrack(track)
            )

            userStream.getTracks().forEach((track)=>{
                currentStream.addTrack(track)
            })

            store.dispatch(slices.users.actions.updateMe({
                refreshStream: (new Date()).getTime(),
            }))
            store.dispatch(slices.users.actions.resetPeerUsersStatus({
                status: 'init',
                refreshStream: (new Date()).getTime(),
            }))

            !isMobileDevice && navigator.mediaDevices.enumerateDevices().then((devices)=>{
                const grouped = devicesGrouped(devices)
                store.dispatch(slices.devices.actions.init(grouped))
            })
        }).catch((err)=>{
            console.error(err)
        })
    }, [constraintVideo, constraintAudio])
}