import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { usePeer } from '../../providers/PeerProvider'
import { useStream } from '../../providers/StreamProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import UserCard from './UserCard'

const _UserCardMe = React.memo(function _UserCardMe(props) {
  const { user, sharingVideoId, ...rest } = props

  const currentStream = useStream()

  return <UserCard {...rest} user={user} muted={true} stream={currentStream} />
}, (prevProps, nextProps)=>{
  return prevProps.user.refreshStream === nextProps.user.refreshStream
})

export default function UserCardMe(props) {
  const { mode = 'me', ...rest } = props

  const currentPeer = usePeer()

  const sharingVideoId = useSelector((state)=>state.sharingVideo.peerId)
  const user = useSelector((state)=>state.users.me)

  if (!user) {
    return null
  }

  if (mode == 'me' && sharingVideoId !== currentPeer.id) {
    return <_UserCardMe {...rest} mode={mode} user={user} />
  }

  if (mode == 'sharing') {
    return <_UserCardMe {...rest} mode={mode} user={user} />
  }
}
