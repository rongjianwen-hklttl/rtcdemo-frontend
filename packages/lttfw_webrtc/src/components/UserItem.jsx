import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import clsx from 'clsx'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'

export default function UserItem(props) {
  const { sx, user } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  return (
    user &&
    <Box sx={rootSX}>
      <Avatar alt={user.userName} src={user.avatar} />
      <Box className="label">{user.userName}</Box>
      <Box className="status">
        <Badge badgeContent={0} color="primary">
          <IconButton><i className="fa-solid fa-message"/></IconButton>
        </Badge>
        <Badge badgeContent={0} color="primary">
          <IconButton><i className="fa-solid fa-share-nodes"/></IconButton>
        </Badge>
      </Box>
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0.75rem 0.5rem 0.75rem 0.5rem',

      '& .label': {
        flex: 1,
        wordBreak: 'break-all',
        whiteSpace: 'normal',
        margin: '0 0.5rem',
      },

      '& .label.current': {
        color: '#e542a3',
      },

      '& .status .MuiIconButton-root': {
        display: 'none',
        width: '2rem',
        height: '2rem',
        fontSize: '1rem',
      },

      '& .status .MuiBadge-badge': {
        top: '4px',
        right: '4px',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
