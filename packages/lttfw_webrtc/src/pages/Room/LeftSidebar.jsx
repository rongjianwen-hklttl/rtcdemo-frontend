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

import UserList from './UserList'
import LsControlPanel from './LsControlPanel'
import LsNavigation from './LsNavigation'

export default function LeftSidebar(props) {
  const { sx } = props

  const hidden = useSelector((state)=>state.settings.leftSidebar.hidden)
  const currentTab = useSelector((state)=>state.settings.currentTab)
  
  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    hidden,
    currentTab,
  })

  return (
    <Box sx={rootSX}>
      <UserList />
      <LsControlPanel />
      { !isMobile && <LsNavigation /> }
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile, hidden, currentTab } = params

  const style = _.merge(
    {
      minHeight: 0,
      display: isMobile && currentTab !== 'leftSidebar' ? 'none' :
        (hidden ? 'none' : 'flex'),
      flexDirection: 'column',
      position: 'relative',
      //backgroundColor: '#eee',
      width: isMobile ? '100%' : theme.leftSidebar.width,
      maxWidth: isMobile ? '100%' : theme.leftSidebar.width,
      boxShadow: theme.leftSidebar.boxShadow,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
