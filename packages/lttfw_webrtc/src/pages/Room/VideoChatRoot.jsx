import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import VideoChatScroll from './VideoChatScroll'
import VideoChat from './VideoChat'
import ShareScreenCard from './ShareScreenCard'
import DebugEvents from './DebugEvents'

export default function VideoChatRoot(props) {
  const { sx } = props

  const videoChatHidden = useSelector((state)=>state.settings.videoChat.hidden)
  const leftSidebarHidden = useSelector((state)=>state.settings.leftSidebar.hidden)
  const rightSidebarHidden = useSelector((state)=>state.settings.rightSidebar.hidden)
  const currentTab = useSelector((state)=>state.settings.currentTab)
  
  const sharingVideoId = useSelector((state)=>state.sharingVideo.peerId)
 
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    currentTab,
    videoChatHidden,
    leftSidebarHidden,
    rightSidebarHidden,
  })

  return (
    <Box sx={rootSX}>
      { sharingVideoId ?
        <>
          <ShareScreenCard />
          <VideoChatScroll />
          <DebugEvents />
        </> :
        <>
          <VideoChat />
          <DebugEvents />
        </>
      }
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const {
    isMobile,
    currentTab,
    videoChatHidden,
    leftSidebarHidden,
    rightSidebarHidden,
  } = params

  let videoChatWidth = 'calc(100vw'
  if (!leftSidebarHidden) {
    videoChatWidth += ' - ' + theme.leftSidebar.width
  }
  if (!rightSidebarHidden) {
    videoChatWidth += ' - ' + theme.rightSidebar.width
  }
  videoChatWidth += ')'

  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      display: isMobile && currentTab !== 'videoChat' ? 'none' : 
        (videoChatHidden ? 'none' : 'flex'),
      flexDirection: 'column',
      padding: '1rem',
      width: isMobile ? '100%' : videoChatWidth,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
