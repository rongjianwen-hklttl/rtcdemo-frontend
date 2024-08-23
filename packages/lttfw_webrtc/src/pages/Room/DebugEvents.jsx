import React from 'react'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import string_format from 'string-format'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTranslation } from 'react-i18next'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

export default function DebugEvents(props) {
  const { sx, message } = props

  const debugMode = useSelector((state)=>state.events.debugMode)
  const events = useSelector((state)=>state.events.list)

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  const scrollRef = React.useRef(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [events])

  return debugMode && (
    <Box sx={rootSX}>
      <Box className='title'>Events (Debug mode)</Box>
      <Box className='content' ref={scrollRef}>
        <Stack spacing={2}>
          { events.map((e)=>
            <Alert
              key={uuidv4()}
              severity={e.severity ? e.severity : 'error'}
              action={
                <IconButton color="inherit" size="small" onClick={()=>onViewEvent(e)}>
                  <i className='fa-solid fa-eye' />
                </IconButton>
              }>
              <Box className='field'>
                <Box className='label'>Type:</Box>
                <Box className='control type'>{e.type}</Box>
              </Box>
              <Box className='field'>
                <Box className='label'>Title:</Box>
                <Box className='control title'>{e.title}</Box>
              </Box>
              <Box className='field'>
                <Box className='label'>Payload:</Box>
                <Box className='control message'>
                  { typeof e.message !== 'string' ? JSON.stringify(e.message) : e.message }
                </Box>
              </Box>
              <Box className='field'>
                <Box className='control created_at'>{e.created_at}</Box>
              </Box>
            </Alert>
          )}
        </Stack>
      </Box>
    </Box>
  )

  function onViewEvent(e) {
    console.debug(e)
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      minHeight: '8rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '0.5rem 0',

      '& .content': {
        minHeight: 0,
        flex: 1,
        overflowY: 'auto',
      },

      '& .title': {
        fontWeight: 'bold',
      },
      '& .field': {
        display: 'flex',
        flexDirection: 'row',
      },
      '& .label': {
        width: '6rem',
      },
      '& .control': {
        flex: 1,
      },
      '& .message': {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        display: 'block',
        overflow: 'hidden',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
