import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import Peer from 'peerjs'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import { AvatarGenerator } from 'random-avatar-generator'

import Header from '../../layouts/common/Header'
import ResetAll from '../../components/ResetAll'

export default function Login(props) {
  const { sx } = props

  const layoutName = useLayout()
  const { roomName: defaultRoomName, userName: defaultUserName } = useParams()
  const { store, slices } = useStore()
  const navigate = useNavigate()
  const ws = useSignal()
  const { t } = useTranslation()
  const generator = new AvatarGenerator()
  
  const [roomName, setRoomName] = React.useState(defaultRoomName??'')
  const [userName, setUserName] = React.useState(defaultUserName??'')
  const [avatar, setAvatar] = React.useState(generator.generateRandomAvatar())

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <>
      <Header />
      <ResetAll />
      <Box sx={rootSX}>
        <Box className="login-content">
          <Box className="login-avatar">
            <Avatar alt={userName} src={avatar} sx={{ width: 86, height: 86 }} />
            <IconButton onClick={handleGenAvatar}><i className="fa-solid fa-refresh" /></IconButton>
          </Box>
          <TextField label={t('label-room-name')} variant="outlined" value={roomName} disabled={!_.isEmpty(defaultRoomName)} onChange={handleRoomNameChange} />
          <TextField label={t('label-user-name')} variant="outlined" value={userName} disabled={!_.isEmpty(defaultUserName)} onChange={handleUserNameChange} />
        </Box>
        <Box className="login-opt">
          <Button variant="contained" onClick={handleSubmit}>{t('label-join')}</Button>
        </Box>
      </Box>
    </>
  )

  function handleGenAvatar() {
    setAvatar(generator.generateRandomAvatar())
  }

  function handleRoomNameChange(e) {
    setRoomName(e.target.value)
  }

  function handleUserNameChange(e) {
    setUserName(e.target.value)
  }

  function handleSubmit() {
    navigate('/session/'+roomName+'/'+userName+'/avatar/'+(new URL(avatar)).search)
  }
}


export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '4rem',
      
      '& .login-avatar': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '& .login-avatar .MuiIconButton-root': {
        color: '#b5b5b5',
      },

      '& .login-content': {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '20rem',
      },

      '& .login-content .MuiFormControl-root': {
        marginTop: '0.5rem',
      },

      '& .login-opt': {
        marginTop: '0.5rem',
        display: 'flex',
        flexDirection: 'row',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
