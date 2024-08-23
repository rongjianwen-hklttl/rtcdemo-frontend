import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'

import UserCardItem from './UserCardItem'

export default function UserCardList(props) {
  const { sx } = props

  const peerIds = useSelector((state)=>state.peerIds.list)

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return peerIds.map((peerId)=>
    <Grid key={peerId} item xs={12} md={6} xl={4}>
      <UserCardItem peerId={peerId} readOnly={true} muted={false} />
    </Grid>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      minHeight: 0,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
