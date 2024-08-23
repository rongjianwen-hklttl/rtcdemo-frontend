import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { usePeer } from '../../providers/PeerProvider'
import { useSignal } from '../../providers/SignalProvider'
import { useStream } from '../../providers/StreamProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import UserCardMe from './UserCardMe'
import UserCardItem from './UserCardItem'

export default function ShareScreenCard(props) {
  const { sx } = props

  const sharingVideoId = useSelector((state)=>state.sharingVideo.peerId)
  const currentPeer = usePeer()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      { currentPeer.id === sharingVideoId ? <UserCardMe mode='sharing' /> : <UserCardItem mode='sharing' peerId={sharingVideoId} /> }
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      minHeight: 0,
      marginBottom: '0.5rem',
      position: 'relative',

      '& .screen-sharing': {
        aspectRatio: '16/9',
        display: 'block',
        height: '100%',
        position: 'relative',
      },

      '& .controls': {
        width: '100%',
        backgroundColor: 'rgba(200, 200, 200, 0)',
        color: 'white',

        position: 'absolute',
        top: '0',
        display: 'flex',
        flexDirection: 'row',
        zIndex: 2,
      },
      '& .controls .title': {
        flex: 1,
        textAlign: 'center',
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '--webkit-line-clamp': 1,
        textAlign: 'center',
        padding: '0.25rem 1rem',
      },
      
      '&:hover .controls': {
        backgroundColor: 'rgba(43, 51, 63, 0.7)',
      },

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
  