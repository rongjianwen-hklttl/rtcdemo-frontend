import React from 'react'
import { useSelector } from 'react-redux'

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

export default function UserCard(props) {
  const { sx, user, muted = false } = props

  //const sharingVideoId = useSelector((state)=>state.sharingVideo.id)
  //const me = useSelector((state)=>state.users.me)

  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })
  const videoSX = createVideoSX(theme, sx, {
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
  /*
    component='iframe'
    autoPlay={true}
    title={user.userName}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin" 
    {
        user.stream ?
        <Box
          ref={videoRef}
          component='video'
          autoPlay={true}
          muted={true}
          sx={videoSX}
        /> :
        <Box style={{backgroundImage: `url(${user.avatar})`}} sx={videoSX} />
      }
    */
  return (
    user &&
    <Card sx={rootSX}>
      <Box className="label">
        {user.userName}
      </Box>
      <Box
        ref={videoRef}
        component='video'
        autoPlay={true}
        playsInline={true}
        controls={false}
        muted={muted}
        sx={videoSX}
      />
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

      '&:hover .label': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}

export function createVideoSX(theme, sx, params) {
  const style = _.merge(
    {
      width: '100%',
      height: '100%',
      aspectRatio: '16/9',
      maxHeight: '100%',
      backgroundColor: '#eee',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}