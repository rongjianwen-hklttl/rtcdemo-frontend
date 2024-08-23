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
import Grid from '@mui/material/Grid'

import UserCardItem from './UserCardItem'
import UserCardMe from './UserCardMe'

export default function VideoChatScroll(props) {
  const { sx } = props

  const sharingVideoId = useSelector((state)=>state.sharingVideo.peerId)
  const peerIds = useSelector((state)=>Object.keys(state.users.list), (nv, ov)=>{
    return _.isEqual(nv, ov)
  })

  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
    <UserCardMe className="item" />
    { peerIds.map((peerId)=>
      sharingVideoId === peerId ? null :
        <UserCardItem className="item" key={uuidv4()} peerId={peerId} muted={false} readOnly={true} />
    )}
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params

  const style = _.merge(
    {
      minHeight: '9rem',
      display: 'flex',
      flexDirection: 'row',
      overflowX: 'auto',
      overflowY: 'hidden',

      '& .item': {
        margin: '0.5rem 0.5rem',
        flexBasis: '12rem',
        flexGrow: 0,
        flexShrink: 0,
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
