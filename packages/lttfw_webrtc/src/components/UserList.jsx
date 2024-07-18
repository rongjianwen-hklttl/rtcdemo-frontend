import React from 'react'
import { useSelector } from 'react-redux'

import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import UserItem from './UserItem'

export default function UserList(props) {
  const { sx } = props
  
  const me = useSelector((state)=>state.users.me)
  const userList = useSelector((state)=>state.users.list)
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  return (
    <Box sx={rootSX}>
      <UserItem user={me} />
      { _.keys(userList).map((peerId)=><UserItem key={uuidv4()} user={userList[peerId]} />) }
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
