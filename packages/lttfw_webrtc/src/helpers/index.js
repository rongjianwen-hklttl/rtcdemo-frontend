export * from '@lttfw/ui/src/helpers'

import axios from 'axios'
import _ from 'lodash'

export function request(url, payload, method) {
    return axios[method](url, payload)
}

export function request_get(url, payload) {
    return request(url, payload, 'get')
}

export function request_post(url, payload) {
    return request(url, payload, 'post')
}

export function switchStream(stream, me) {
    console.debug('switchStream...')
    Object.values(me.peer?.connections).forEach((connection) => {
        const videoTrack = stream?.getTracks()
      .find((track) => track.kind === "video")

    if (_.isEmpty(connection)) {
      return
    }

    connection[0].peerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video")
      .replaceTrack(videoTrack)
      .catch((err) => console.error(err))
  })
}

export function startCapture(displayMediaOptions) {
    return navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
}

export function downloadURI(uri, name) {
    var link = document.createElement("a")
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute('download', name)
    link.href = uri
    document.body.appendChild(link)
    link.click()
    link.remove()
}
