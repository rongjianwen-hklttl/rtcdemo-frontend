import React from 'react'
import { useSelector } from 'react-redux'

import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'

import UserCard from './UserCard'
import SharingVideo from './SharingVideo'

export default function VideoList(props) {
  const { sx } = props

  const sharingVideoId = useSelector((state)=>state.sharingVideo.id)
  const me = useSelector((state)=>state.users.me)
  const userList = useSelector((state)=>state.users.list)

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    sharingVideoId,
  })

  const itemProps = sharingVideoId ? {
    width: '100%',
  } : {
    xs: 12,
    md: 6,
    xl: 4,
  }
  return (
    <Box sx={rootSX}>
      <Grid container spacing={2}>
        { me && sharingVideoId !== me.peerId &&
          <Grid item {...itemProps}>
            { <UserCard user={me} muted={true} isMe={true} /> }
          </Grid>
        }
        { _.keys(userList).map((peerId)=>
          sharingVideoId !== peerId &&
          <Grid item {...itemProps} key={uuidv4()}>
             <UserCard user={userList[peerId]} muted={false} isMe={false} />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile, sharingVideoId } = params
  const style = _.merge(
    {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      //minHeight: 0,
      minHeight: '12rem',
      overflowY: isMobile ? 'auto' : 'unset',
      overflowX: isMobile ? 'hidden' : 'unset',
      height: isMobile ? '100%' : 'auto',
      minWidth: sharingVideoId ? '20rem' : 'unset',
      maxWidth: sharingVideoId ? '20rem' : 'unset',
      padding: '0 1rem',

      '& .MuiGrid-container': {
        minHeight: 0,

        display: 'flex',
        flexWrap: sharingVideoId ? 'unset' : 'wrap',
        flexDirection: sharingVideoId ? 'column' : 'unset',
        marginTop: 0,
        paddingBottom: '16px',
        overflowY: 'auto',
        overflowX: 'hidden',
        marginLeft: isMobile ? '-12px' : '-16px',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
