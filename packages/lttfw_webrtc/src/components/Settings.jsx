import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import { useEngine } from '@lttfw/core/src/providers/EngineProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../providers/SignalProvider'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { addEvent } from '../helpers'

export default function Settings(props) {
  const { sx, handleClose } = props

  const leftSidebarHidden = useSelector((state)=>state.settings.leftSidebar.hidden)
  const rightSidebarHidden = useSelector((state)=>state.settings.rightSidebar.hidden)
  const debugMode = useSelector((state)=>state.events.debugMode)
  const themeName = useSelector((state)=>state.settings.themeName)
  const currentRoomName = useSelector((state)=>state.users.me.roomName)

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  const engine = useEngine()
  const { store, slices } = useStore()
  const { ws } = useSignal()

  function messagesDeleted() {
    debugMode && addEvent(store, slices, 'info', 'ws.received', 'delete-all-messages', null)
  }

  React.useEffect(()=>{
    ws.on('messages-deleted', messagesDeleted)

    return ()=>{
      ws.off('messages-deleted')
    }
  }, [])


  return (
    <Box sx={rootSX}>
      <FormGroup>
        <FormControlLabel control={<Checkbox onChange={(e)=>showModule(e, 'leftSidebar')} checked={!leftSidebarHidden} />} label="Show users" />
        <FormControlLabel control={<Checkbox onChange={(e)=>showModule(e, 'rightSidebar')} checked={!rightSidebarHidden} />} label="Show messages" />
        <FormControlLabel control={<Checkbox onChange={(e)=>enableDarkMode(e, _.endsWith(themeName, '_dark'))} checked={_.endsWith(themeName, '_dark')} />} label="Dark mode" />
        <FormControlLabel control={<Checkbox onChange={(e)=>enableDebugMode(e, !debugMode)} checked={debugMode} />} label="Debug mode" />
        <Button variant='link' onClick={deleteAllMessages}>Delete all messages</Button>
      </FormGroup>
    </Box>
  )

  function deleteAllMessages() {
    handleClose && handleClose()
    
    debugMode && addEvent(store, slices, 'success', 'ws.emit', 'delete-all-messages', currentRoomName)
    ws.emit('delete-all-messages', currentRoomName)
  }
  
  function enableDebugMode(e, key, value) {
    handleClose && handleClose()
    
    store.dispatch(slices.events.actions.set({
      key: 'debugMode',
      value,
    }))
  }

  function enableDarkMode(e, value) {
    handleClose && handleClose()

    const themeName = value ? 'classic_light' : 'classic_dark'

    localStorage.setItem('themeName', themeName)
    
    store.dispatch(slices.settings.actions.set({
      key: 'themeName',
      value: themeName,
    }))
  }

  function showModule(e, moduleName) {
    handleClose && handleClose()
    
    store.dispatch(slices.settings.actions.setSub({
      key: moduleName,
      subKey: 'hidden',
      value: !e.target.checked,
    }))
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      padding: '0.5rem',
      minWidth: isMobile ? '100%' : '12rem',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
