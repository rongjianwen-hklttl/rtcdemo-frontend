import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'
import videojs from 'video.js'
import AudioMotionAnalyzer from 'audiomotion-analyzer'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import { mobileAndTabletCheck } from '../../helpers'

export default function VideoPlayer(props) {
  const { sx, cover, stream, muted = false } = props

  const { store, slices } = useStore()
  
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    cover,
  })

  const isMobileDevice = mobileAndTabletCheck()

  const videoRef = React.useRef()
  const playerRef = React.useRef(null)
  const audioCanvasRef = React.useRef(null)
  const options = {
    controls: true,
    autoplay: true,
    muted,
    controlBar: isMobileDevice ? {
      fullscreenToggle: false,
      pictureInPictureToggle: false,
    } : undefined
  }

  React.useEffect(()=>{
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-16-9');

      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        //onReady && onReady(player);
      });

      var vid = player.tech().el()
      //vid.setAttribute('autoplay', 'autoplay')
      vid.setAttribute('playsinline', 'playsinline')

      var vid = player.tech().el()
      vid.srcObject = stream
    }
  }, [videoRef])

  React.useEffect(()=>{
      const player = playerRef.current
      if (!player) {
        return
      }
    
      var vid = player.tech().el()
      vid.srcObject = stream
  }, [stream?.getTracks()])

  const hasVideoTrack = stream?.getVideoTracks().length > 0
  const hasAudioTrack = stream?.getAudioTracks().length > 0

  return (
    <Box ref={videoRef} sx={rootSX}>
      { (!hasVideoTrack && !hasAudioTrack) &&
        <Box className="cover-root" onMouseEnter={showControls}>
          <Box className="cover"></Box>
        </Box>
      }
      { hasAudioTrack && <Box ref={audioCanvasRef} className="audio-canvas"></Box> }
    </Box>
  )

  function showControls(e) {
    if (!playerRef.current) {
      return
    }

    const player = playerRef.current
    player.userActive(true)
  }
}

export function createRootSX(theme, sx, params) {
  const { cover } = params
  const style = _.merge(
    {
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',

      '& .audio-canvas': {
        height: 'calc(100% - 3.5rem)',
        width: 'calc(100% - 2rem)',
        position: 'absolute',
        zIndex: 1,
        opacity: 0.8,
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
