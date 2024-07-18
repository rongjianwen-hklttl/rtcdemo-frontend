import React from 'react'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
import _ from 'lodash'
import moment from 'moment'
import string_format from 'string-format'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTranslation } from 'react-i18next'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'

export default function Message(props) {
  const { sx, message, reversed = false } = props

  const { t } = useTranslation()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    reversed,
  })

  return (
    <Box sx={rootSX}>
      { (message.type === 'alert-tempate' || reversed) ?
      <Box className={clsx(message.type === 'alert-tempate' ? 'alert' : 'message')}>
        <Box>{ string_format(t(message.text), { userName: message.user.userName }) }</Box>
        <Box className='datetime'>{ moment(message.created_at).format('HH:mm') }</Box>
      </Box> :
      <>
        <Box className='avatar'>
          <Avatar alt={message.user.userName} src={message.user.avatar} />
        </Box>
        <Box className='message'>
          <Box className='username'>{ message.user.userName }</Box>
          <Box className='text'>{ message.text }</Box>
          <Box className='datetime'>{ moment(message.created_at).format('HH:mm') }</Box>
        </Box>
      </>
    }
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { reversed } = params
  const style = _.merge(
    {
      padding: '0.5rem',
      display: 'flex',
      flexDirection: reversed ? 'row-reverse' : 'row',

      '& .username': {
        color: '#646464',
      },

      '& .avatar': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
      },

      '& .alert': {
        display: 'block',
        position: 'relative',
        margin: '0 auto',
        borderColor: 'transparent',
        padding: '0.5rem 0.75rem',
        borderRadius: '1rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        backgroundColor: '#f2f2f2',
        color: '#7d7d7d',
      },
      '& .alert .datetime': {
        fontSize: '12px',
        textAlign: 'right',
        color: 'rgb(102, 119, 129)',
      },

      '& .message': {
        display: 'inline-block',
        position: 'relative',
        marginTop: 0,
        marginLeft: '0.667em',
        borderColor: reversed ? '#d9fdd3' : '#eee',
        padding: '0.5rem 0.75rem',
        borderRadius: '1rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        backgroundColor: reversed ? '#d9fdd3' : '#fff',
      },

      '& .message::before': {
        content: "''",
        marginBottom: '-1px',
        top: 'auto',
        bottom: '6px',
        left: reversed ? 'auto' : '-1px',
        right: reversed ? '-1px' : 'auto',
        borderColor: 'inherit',
        borderWidth: '0 0 1px 1px',
        position: 'absolute',
        transform: reversed ? 'translateX(50%) translateY(-50%) rotate(45deg)' : 'translateX(-50%) translateY(-50%) rotate(45deg)',
        width: '.6666em',
        height: '.6666em',
        borderStyle: 'solid',
        zIndex: 2,
        backgroundColor: reversed ? '#d9fdd3' : '#fff',
      },

      '& .message .username': {
        color: '#e542a3',
      },

      '& .message .text': {
        color: '#111b21',
      },

      '& .message .datetime': {
        fontSize: '12px',
        textAlign: 'right',
        color: 'rgb(102, 119, 129)',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
