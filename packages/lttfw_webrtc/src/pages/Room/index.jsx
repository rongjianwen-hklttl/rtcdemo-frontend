import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { useModal } from 'mui-modal-provider'
import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import UserList from '../../components/UserList'
import FileList from '../../components/FileList'

import SharingVideo from '../../components/SharingVideo'
import VideoList from '../../components/VideoList'
import MessageList from '../../components/MessageList'
import SharingButtons from '../../components/SharingButtons'

import Header from '../../layouts/common/Header'
import CustomTabPanel from './CustomTabPanel'
import Init from './Init'
import RequiresPermissions from './RequiresPermissions'
import ForceRefreshStream from './ForceRefreshStream'
import FileReceiver from './FileReceiver'

export default function Home(props) {
  const { sx } = props

  const sharingVideoId = useSelector((state)=>state.sharingVideo.id)
  const [tabValue, setTabValue] = React.useState(1)
  const avatar = 'https://avataaars.io/'+window.location.search

  const { showModal } = useModal()
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })
  const chatSX = createChatSX(theme, sx, {
    isMobile,
    sharingVideoId,
  })

  const userListSX = createUserListSX(theme, sx, {
    isMobile,
    sharingVideoId,
  })

  return (
    isMobile ?
    <>
      <Header />
      <RequiresPermissions avatar={avatar} />
      <Init avatar={avatar} />
      <ForceRefreshStream />
      <FileReceiver />
      <Box sx={rootSX}>
        <CustomTabPanel value={tabValue} index={0}>
          <>
            <UserList fullWidth={true} />
            { !isMobile && <SharingButtons /> }
          </>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <VideoList fullWidth={true}  />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <MessageList fullWidth={true} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          <SharingVideo sx={{height: 'calc(100% - 3rem)'}} />
          <FileList />
          { isMobile && <SharingButtons sx={{height: '3rem'}}/> }
        </CustomTabPanel>
        <BottomNavigation
          showLabels
          value={tabValue}
          onChange={(event, newValue) => {
            setTabValue(newValue)
          }}
          sx={{
            zIndex: 999,
            position: 'absolute',
            width: '100%',
          }}
        >
          <BottomNavigationAction label="Users" icon={<i className="fa-solid fa-users" />} />
          <BottomNavigationAction label="WaChord" icon={<i className="fa-solid fa-video" />} />
          <BottomNavigationAction label="Messages" icon={<i className="fa-solid fa-comments" />} />
          <BottomNavigationAction label="Control" icon={<i className="fa-solid fa-wrench" />} />
        </BottomNavigation>
      </Box>
    </> :
    <>
      <Header />
      <RequiresPermissions avatar={avatar} />
      <Init avatar={avatar} />
      <ForceRefreshStream />
      <FileReceiver />
      <Box sx={rootSX}>
        <Box sx={userListSX}>
          <UserList />
          <FileList />
          <SharingButtons />
        </Box>
        { sharingVideoId && <SharingVideo /> }
        <Box sx={chatSX}>
          <VideoList />
          <MessageList />
        </Box>
      </Box>
    </>
  )

  function handleTabChange(event, newValue) {
    setTabValue(newValue)
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      flex: 1,
      padding: 0,//isMobile ? 0 : '0.5rem',
      display: isMobile ? 'inline-block' : 'flex',
      flexDirection: 'row',
      minHeight: 0,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}

export function createChatSX(theme, sx, params) {
  const { sharingVideoId } = params
  const style = _.merge(
    {
      minHeight: 0,
      padding: 0, //'0.5rem 0 0.5rem 0.5rem',
      display: 'flex',
      flex: sharingVideoId ? 'unset' : 1,
      flexDirection: sharingVideoId ? 'column' : 'row',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}

export function createUserListSX(theme, sx, params) {
  const { sharingVideoId } = params
  const style = _.merge(
    {
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',

      minWidth: theme.appSidebar.width,
      width: theme.appSidebar.width,
      backgroundColor: theme.appSidebar.bgColor,
      color: theme.appSidebar.color,
      boxShadow: '4px 0 4px -2px #f2f2f2',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}