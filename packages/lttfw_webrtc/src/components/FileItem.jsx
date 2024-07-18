import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/Box'

import { downloadURI } from '../helpers'

export default function FileItem(props) {
  const { sx, file } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })
  return (
    <Box sx={rootSX}>
      <Box className="file">
        <Box className="filename">{ file.filename }</Box>
        <IconButton onClick={handleClick}><i className="fa-solid fa-cloud-arrow-down" /></IconButton>
      </Box>
      <Box className="sender">
        <Box className="created_by">{ file.created_by }</Box>
        <Box className="created_at">{ moment(file.created_at).format("HH:mm") }</Box>
      </Box>
    </Box>
  )

  function handleClick() {
    downloadURI(file.url,  file.filename)
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      display: 'block',
      position: 'relative',
      margin: '0.5rem',
      padding: '0.5rem 0.75rem',
      borderColor: 'transparent',
      borderRadius: '1rem',
      borderWidth: '1px',
      borderStyle: 'solid',
      backgroundColor: '#f2f2f2',
      color: '#7d7d7d',
      
      '& .file': {
        display: 'flex',
        flexDirection: 'row',
      },
      '& .filename': {
        flex: 1,
        paddingRight: '0.5rem',
        display: '-webkit-box',
        wordBreak: 'break-all',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
        height: '3rem',
        lineHeight: '1.5',
      },
      '& .sender': {
        display: 'flex',
        flexDirection: 'row',
      },
      '& .created_by': {
        flex: 1,
        fontSize: '12px',
        textAlign: 'text',
        color: 'rgb(102, 119, 129)',
        display: '-webkit-box',
        wordBreak: 'break-all',
        '-webkit-line-clamp': '1',
        '-webkit-box-orient': 'vertical',
      },
      '& .created_at': {
        flex: 1,
        fontSize: '12px',
        textAlign: 'right',
        color: 'rgb(102, 119, 129)',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
