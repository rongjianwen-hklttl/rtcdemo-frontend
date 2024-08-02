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

import { devicesGrouped } from '../../helpers'

export default function InitStream(props) {
    const constraintVideo = useSelector((state)=>state.users.me.constraints?.video)
    const constraintAudio = useSelector((state)=>state.users.me.constraints?.audio)
    const currentPeerId = useSelector((state)=>state.users.me.peerId)
    const currentStream = useSelector((state)=>state.users.me.stream)

    const { store, slices } = useStore()
    const ws = useSignal()
    const { roomName, userName } = useParams()

    React.useEffect(()=>{
        let constraints = {}
        if (constraintVideo?.deviceId) {
            constraints.video = { deviceId: constraintVideo.deviceId }
        }
        if (constraintAudio?.deviceId) {
            constraints.audio = { deviceId: constraintAudio.deviceId }
        }

        if (_.isEmpty(constraints)) {
            store.dispatch(slices.users.actions.updateMe({
                stream: null,
                constraints,
            }))

            if (currentStream) {
                currentStream.getTracks().forEach(function(track) {
                    track.stop()
                })
            }
            return
        }

        const userMediaConstraints = {}
        if (constraintVideo?.deviceId) {
            userMediaConstraints.video = { deviceId: { exact: constraintVideo.deviceId } }
        }
        if (constraintAudio?.deviceId) {
            userMediaConstraints.audio = { deviceId: { exact: constraintAudio.deviceId } }
        }

        navigator.mediaDevices?.getUserMedia(userMediaConstraints)
            .then((stream)=>gotStream(stream, roomName, currentPeerId, constraints))
            .then(gotDevices).catch((err)=>handleError(err, userMediaConstraints))
    }, [constraintVideo?.deviceId, constraintAudio?.deviceId])

    function gotStream(stream, roomId, peerId, constraints) {
        store.dispatch(slices.users.actions.updateMe({
            stream,
            constraints,
        }))

        return navigator.mediaDevices.enumerateDevices()
    }

    function gotDevices(devices) {
        const grouped = devicesGrouped(devices)
        store.dispatch(slices.devices.actions.init(grouped))
    }

    function handleError(error, constraints) {
      console.error('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
      console.error(constraints)
    }
}