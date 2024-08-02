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

import UserCard from './UserCard'

export default function VideoChatScroll(props) {
  const { sx } = props

  const users = useSelector((state)=>state.users.list)

  const { roomName, userName } = useParams()
  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
    { Object.keys(users).map((userId)=>
      <UserCard key={uuidv4()} user={users[userId]} muted={false} hasOpt={false} className="item" />
    )}
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params

  const style = _.merge(
    {
      minHeight: 0,
      display: 'flex',
      flexDirection: 'row',
      overflowX: 'auto',

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
