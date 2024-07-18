import socketIOClient from "socket.io-client"

import { PEER_HOST } from '../constants'
export const WS_URL = (window.location.protocol  === 'https:' ? 'wss://' : 'ws://') + PEER_HOST

/*
export function create_socket(store, slices) {
  return new WebSocket(WS_URL);
}
*/

export function create_socket(store, slices) {
  const ws = socketIOClient(WS_URL, {
    transports: ['websocket']
  })
  return ws
}
