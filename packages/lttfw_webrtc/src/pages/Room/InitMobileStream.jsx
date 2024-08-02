import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import string_format from 'string-format'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { useModal } from 'mui-modal-provider'
import { useTranslation } from 'react-i18next'

export default function InitMobileStream(props) {
    const currentPeerId = useSelector((state)=>state.users.me.peerId)
  
    const { store, slices } = useStore()
    const ws = useSignal()
    const { roomName, userName } = useParams()

    React.useEffect(()=>{
        getUserMedia(store, slices, ws, roomName, currentPeerId, 'user', true)
    }, [currentPeerId])
}

export function getUserMedia(store, slices, ws, roomId, peerId, facingMode, enableAudio) {
    const constraints = {
        video: facingMode != 'none' ? {facingMode: {exact: facingMode}} : false,
        audio: enableAudio,
    }
    if (!constraints.video && !constraints.audio) {
        store.dispatch(slices.users.actions.updateMe({
            stream: null,
            constraints: {
                video: facingMode,
                audio: enableAudio,
            },
        }))
    }
    navigator.mediaDevices.getUserMedia(constraints).then((medaiStream)=>{
        gotStream(store, slices, ws, roomId, peerId, medaiStream, facingMode, enableAudio)
    }).catch((err)=>handleError(err, constraints))
}

export function gotStream(store, slices, ws, roomId, peerId, stream, facingMode, enableAudio) {
    store.dispatch(slices.users.actions.updateMe({
        stream,
        constraints: {
            video: facingMode,
            audio: enableAudio,
        }
    }))
}

function handleError(error, constraints) {
    console.error('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
    console.error(constraints)
}