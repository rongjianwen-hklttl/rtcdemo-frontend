import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'

import Message from './Message'

export default function MessageList(props) {
  const { sx } = props

  const currentUserName = useSelector((state)=>state.users.me.userName)
  const messages = useSelector((state)=>state.messages.list)
  
  const [value, setValue] = React.useState('')

  const { ws } = useSignal()
  const { t } = useTranslation()
  
  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
    { messages.map((m)=>
      <Message
        key={uuidv4()} 
        message={m}
        reversed={m.user.userName == currentUserName}
      />
    )}
  </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
