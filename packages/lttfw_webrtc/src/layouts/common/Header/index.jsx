import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import LangPopover from '../../../components/LangPopover'
import UserPopover from '../../../components/UserPopover'

export default function Header(props) {
  const { sx } = props

  const { roomName, userName } = useParams()
  
  const { t } = useTranslation()
  const { store, slices } = useStore()
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  return (
    <Box sx={rootSX}>
      <Box className="logo"></Box>
      <Box className="roomName">{roomName}</Box>
      <Box className="userName">{userName}</Box>
      <Box className="avatar"><UserPopover /></Box>
      <Box><LangPopover /></Box>
    </Box>
  )

  function changeLang() {

  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 0,

      height: theme.header.height,
      //backgroundColor: theme.header.bgColor,
      background: 'linear-gradient(#f2f2f2, #bfbfbf)',
      color: theme.header.color,
      fontSize: '1.2rem',
      textShadow: '2px 2px 2px rgb(128, 128, 128)',

      '& .logo': {
        padding: '0 0.5rem',
        width: isMobile ? '4rem' : theme.appSidebar.width,
        height: isMobile ? '80%' : '100%',
        backgroundImage: isMobile ? 'url("/assets/images/wachord_icon.png")' : 'url("/assets/images/wachord_logo.png")',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      },

      '& .roomName': {
        margin: '0 0.5rem',
        wordBreak: 'break-all',
        display: '-webkit-box',
        '-webkit-line-clamp': '1',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        height: theme.header.height,
        lineHeight: theme.header.height,
        flex: 1,
        textAlign: 'left',
      },
      '& .userName': {
        marginRight: '0.5rem',
        wordBreak: 'break-all',
        display: '-webkit-box',
        '-webkit-line-clamp': '1',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        height: theme.header.height,
        lineHeight: theme.header.height,
        flex: 1,
        textAlign: 'right',
      },
      '& .avatar': {
        marginRight: '0.5rem',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
