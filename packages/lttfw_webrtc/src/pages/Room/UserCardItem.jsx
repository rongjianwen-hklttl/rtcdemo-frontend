import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { usePeer } from '../../providers/PeerProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import UserCard from './UserCard'
import InitPeerUser from './InitPeerUser'

const _UserCardItem = React.memo(function _UserCardItem(props) {
  const { user, ...rest } = props

  const peerStream = window.__peerStreams__[user.peerId]

  return user && <UserCard {...rest} user={user} stream={peerStream} />
}, (prevProps, nextProps)=>{
  return prevProps.user.refreshStream === nextProps.user.refreshStream
})

export default function UserCardItem(props) {
  const { peerId, ...rest } = props
  const user = useSelector((state)=>state.users.list[peerId])
  
  return <_UserCardItem {...rest} user={user} />
}
