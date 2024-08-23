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

import UserItem from './UserItem'
import UserItemMe from './UserItemMe'

export default function UserList(props) {
  const { sx } = props

  const currentLsTab = useSelector((state)=>state.settings.currentLsTab)
  const peerIds = useSelector((state)=>Object.keys(state.users.list))

  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    currentLsTab,
  })

  return (
    <Box sx={rootSX}>
      <UserItemMe />
      { peerIds.map((peerId)=><UserItem key={uuidv4()} peerId={peerId} />) }
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile, currentLsTab } = params

  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      display: currentLsTab !== 'lsUsers' ? 'none' : 'flex',
      flexDirection: 'column',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
