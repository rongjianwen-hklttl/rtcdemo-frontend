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

import SharingButtons from './SharingButtons'
import UserItem from './UserItem'
import MeItem from './MeItem'

export default function UserList(props) {
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
      <MeItem />
      { Object.keys(users).map((userId)=><UserItem key={uuidv4()} user={users[userId]} />) }
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { cover } = params

  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
