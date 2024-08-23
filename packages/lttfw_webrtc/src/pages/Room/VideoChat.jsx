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

import UserCardMe from './UserCardMe'
import UserCardList from './UserCardList'

export default function VideoChat(props) {
  const { sx } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <Grid container spacing={2}>
        <Grid key={uuidv4()} item xs={12} md={6} xl={4}>
          <UserCardMe />
        </Grid>
        <UserCardList />
      </Grid>
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      minHeight: 0,
      overflowY: 'auto',
      flex: 1,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
