import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'

import VideoPlayer from './VideoPlayer'
import VideoSelector from './VideoSelector'
import AudioSelector from './AudioSelector'
import VideoToggler from './VideoToggler'
import AudioToggler from './AudioToggler'

export default function UserCard(props) {
  const { sx, className, user, muted = false, hasOpt = false } = props

  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    cover: user.avatar,
    hasOpt,
  })

  return (
    <Box sx={rootSX} className={className}>
      { user.stream && <VideoPlayer user={user} muted={muted} /> }
      { !user.constraints?.video && !user.stream &&
        <Box className="cover-root">
          <Box className="cover"></Box>
        </Box>
      }
      <Box className="controls">
        <Box className="title">{user.userName}</Box> 
        { hasOpt ?
          <Box className="opt">
            { typeof user.constraints?.video === "string" ? <VideoToggler /> : <VideoSelector /> }
            { typeof user.constraints?.audio === "boolean" ? <AudioToggler /> : <AudioSelector /> }
          </Box> :
          <Box className="opt">
            <IconButton variant="contained" disabled={true}>
              { (_.isEmpty(user.constraints?.video) || user.constraints?.video === 'none') &&
                <i className="fa-solid fa-times" />
              }
              <i className="fa-solid fa-camera" />
            </IconButton>
            <IconButton variant="contained" disabled={true}>
              { !user.constraints?.audio &&
                <i className="fa-solid fa-times" />
              }
              <i className="fa-solid fa-microphone" />
            </IconButton>
          </Box>
        }
      </Box>
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { cover, hasOpt } = params

  const style = _.merge(
    {
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      aspectRatio: '16/9',
      backgroundColor: '#000',

      '& .controls': {
        width: '100%',
        backgroundColor: 'rgba(200, 200, 200, 0)',
        color: 'white',

        position: 'absolute',
        top: '0',
        display: 'flex',
        flexDirection: 'row',
        zIndex: 2,
      },
      '& .controls .opt': {
        display: 'flex',
        flexDirection: 'row',
      },
      '& .controls .MuiButtonBase-root': {
        color: 'white',
        fontSize: '1rem',
      },
      '& .title': {
        flex: 1,
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '3.75rem',
      },
      
      '&:hover .controls': {
        backgroundColor: 'rgba(43, 51, 63, 0.7)',
      },
      '&:hover .controls .opt': {
        opacity: 1,
      },

      '& .cover-root': {
        position: 'absolute',
        top: 32,
        bottom: 30,
        zIndex: 1,

        width: '100%',
        height: 'calc(100% - 32 - 30)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },

      '& .cover': {
        width: '100%',
        height: '100%',
        padding: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'contain',
        backgroundImage: cover ? `url(${cover})` : 'none',
      },

      '& .fa-times': {
        fontSize: '50%',
        position: 'absolute',
        right: '6px',
        color: 'white',
        bottom: '5px',
      },

      '& .MuiButtonBase-root[disabled]': {
        color: '#a8a8a8',
      },

      '& .MuiButtonBase-root[disabled] .fa-times': {
        color: '#a8a8a8',
      },

      '& .vjs-big-play-button': {
        display: 'none',
      },
      '& .vjs-control-bar': {
        zIndex: 3,
      },
      '& .vjs-control-bar .vjs-play-control': {
        display: 'none',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
