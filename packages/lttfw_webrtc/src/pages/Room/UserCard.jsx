import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import VideoPlayer from './VideoPlayer'
import UserCardCover from './UserCardCover'
import UserCardControls from './UserCardControls'
import UserCardDebugInfo from './UserCardDebugInfo'

import { isEmptyConstraints } from '../../helpers'

export default function UserCard(props) {
  const { sx, className, user, stream, mode, muted = false, readOnly = false } = props

  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  const { avatar } = user

  const hasVideoTrack = stream?.getVideoTracks().length > 0
  const hasAudioTrack = stream?.getAudioTracks().length > 0

  return user &&
    <Box sx={rootSX} className={className}>
      <UserCardDebugInfo user={user} stream={stream} />
      { (hasVideoTrack || hasAudioTrack) ?
        <VideoPlayer
          cover={avatar}
          stream={stream}
          muted={muted}
          readOnly={readOnly}
        /> :
        <UserCardCover cover={avatar} />
      }
      { mode !== 'sharing' && <UserCardControls user={user} readOnly={readOnly} /> }
    </Box>
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      aspectRatio: '16/9',
      backgroundColor: '#000',

      '& .vjs-tech': {
        pointerEvents: 'none',
      },
      '& .vjs-big-play-button': {
        display: 'none',
      },
      '& .vjs-control-bar': {
        zIndex: 3,
      },
      '& .vjs-control-bar .vjs-play-control': {
        display: 'none',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
