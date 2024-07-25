import React from 'react'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Player from './Player'

export default function UserCard(props) {
  const { sx, user, isMe, muted = false } = props

  //const sharingVideoId = useSelector((state)=>state.sharingVideo.id)
  //const me = useSelector((state)=>state.users.me)

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  const videoRef = React.useRef(null)
  React.useEffect(()=>{
    if (!videoRef.current) {
      return
    }
    if (user?.stream) {
      videoRef.current.srcObject = user.stream
      //videoRef.current.play()
    }
  }, [user])

  return (
    user &&
    <Card sx={rootSX}>
      <Box className="label">
        {user.userName}
      </Box>
      <Box className="content">
        <Player 
          videoRef={videoRef}
          isMe={isMe} 
          muted={muted}
          showCover={false}
          cover={user.avatar}
        />
      </Box>
    </Card>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      width: 'calc(100% - 0.5rem)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',

      '& .label': {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        padding: '0.25rem',
        textAlign: 'center',

        fontSize: '1.2rem',
        fontWeight: 'bold',
        padding: '0.25rem',
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        zIndex: 2,
        color: 'white',
        textShadow: 'rgba(170, 170, 170, 0.83) 1px 0 4px',
      },

      '& .content': {
        position: 'relative',
      },

      '&:hover .label': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },

      '&:hover .controls': {
        display: 'flex',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
