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

import MessageList from './MessageList'
import MessageListFooter from './MessageListFooter'

export default function RightSidebar(props) {
  const { sx } = props

  const hidden = useSelector((state)=>state.settings.rightSidebar.hidden)
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
      <MessageList />
      <MessageListFooter />
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile, hidden, currentTab } = params

  const style = _.merge(
    {
      minHeight: 0,
      display: isMobile && currentTab !== 'rightSidebar' ? 'none' : 
        (hidden ? 'none' : 'flex'),
      flexDirection: 'column',
      padding: isMobile ? 0 : '0.5rem',
      width: isMobile ? '100%' : '20rem',
      maxWidth: isMobile ? '100%' : '20rem',
      height: isMobile ? '100%' : 'auto',
      position: 'relative',
      //backgroundColor: '#eee',
      flex: 1,
      boxShadow: theme.rightSidebar.boxShadow,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
