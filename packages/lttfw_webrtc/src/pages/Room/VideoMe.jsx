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

import UserCard from './UserCard'

export default function VideoMe(props) {
  const { sx } = props
  const user = useSelector((state)=>state.users.me)

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Grid key={uuidv4()} item xs={12} md={6} xl={4}>
      <UserCard user={user} hasOpt={true} muted={true} />
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
