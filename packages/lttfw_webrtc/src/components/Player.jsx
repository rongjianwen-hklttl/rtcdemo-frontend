import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import clsx from 'clsx'
import moment from 'moment'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/Box'

export default function Player(props) {
  const { 
    sx,
    showCover: defaultCover = false,
    cover,
    isMe,
    muted: defaultMuted = false,
    videoRef,
  } = props

  const [ fullscreen, setFullscreen ] = React.useState(false)
  const [ muted, setMuted ] = React.useState(defaultMuted)
  const [ volume, setVolume ] = React.useState(1)
  const [ showCover, setShowCover ] = React.useState(defaultCover)

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    showCover,
    cover,
  })

  React.useEffect(()=>{
    if (!videoRef.current) {
      return
    }
    //videoRef.current.volume = volume
    videoRef.current.addEventListener('fullscreenchange', (e)=>{
      if(document.fullscreenElement == videoRef.current) {
        setFullscreen(true)
      }
      if (document.fullscreenElement == null || document.fullscreenElement != videoRef.current) {
        setFullscreen(false)
      }
    })
  }, [videoRef])

  return (
    <Box sx={rootSX}>
      <Box
        className="video"
        ref={videoRef}
        component='video'
        autoPlay={true}
        playsInline={true}
        controls={false}
        muted={muted}
      />
      <Box className="cover" />
      <Box className='controls'>
        <Box className='control-group'>
          <button className="play" type="button" data-state="play" onClick={togglePlay}>
            <i className="fa-solid fa-play" />
          </button>
        </Box>
        {!isMe &&
          <Box className='control-group'>
            <button className="mute" type="button" data-state="mute" onClick={toggleMuted}>
              <i className={clsx("fa-solid",
                muted ? "fa-volume-xmark" : 
                  (volume == 0 ? "fa-volume-off" : 
                    (volume <= 0.5 ? "fa-volume-low" : "fa-volume-high")))}
              />
            </button>
            <button className="volinc" type="button" data-state="voldown" onClick={decreaseVolume}>
              <span>Vol</span><i className="fa-solid fa-minus" />
            </button>
            <Box className="volval">{Math.floor(volume * 100)}</Box>
            <button className="voldec" type="button" data-state="volup" onClick={increaseVolume}>
              <span>Vol</span><i className="fa-solid fa-plus" />
            </button>
          </Box>
        }
        <Box className='control-group'>
        { fullscreen ?
          <button className="fs" type="button" data-state="go-fullscreen" onClick={toggleFullscreen}>
            <i className="fa-solid fa-compress" />
          </button> :
          <button className="fs" type="button" data-state="go-fullscreen" onClick={toggleFullscreen}>
            <i className="fa-solid fa-expand" />
          </button>
        }
        </Box>
        <Box className='control-group'>
        { showCover ?
          <button className="sc" type="button" data-state="go-showcover" onClick={toggleShowCover}>
            <i className="fa-solid fa-eye" />
          </button> :
          <button className="sc" type="button" data-state="go-showcover" onClick={toggleShowCover}>
            <i className="fa-solid fa-eye-slash" />
          </button>
        }
        </Box>
      </Box>
    </Box>
  )

  function toggleShowCover() {
    setShowCover(!showCover)
  }

  function decreaseVolume() {
    let currentVolume = videoRef.current.volume
    if (currentVolume - 0.1 <= 0) {
      currentVolume = 0
    } else {
      currentVolume -= 0.1
    }
    currentVolume = Math.floor(currentVolume * 100) / 100
    videoRef.current.volume = currentVolume
    setVolume(currentVolume)
  }

  function increaseVolume() {
    let currentVolume = videoRef.current.volume
    if (currentVolume + 0.1 >= 1) {
      currentVolume = 1
    } else {
      currentVolume += 0.1
    }
    currentVolume = Math.floor(currentVolume * 100) / 100
    videoRef.current.volume = currentVolume
    setVolume(currentVolume)
  }

  function togglePlay() {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  function toggleMuted() {
    videoRef.current.muted = !muted
    setMuted(!muted)
  }

  function toggleFullscreen() {
    const elem= videoRef.current
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    }else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }else if (elem.msRequestFullscreen) { 
      elem.msRequestFullscreen();
    }else if (elem.webkitEnterFullScreen) { 
      elem.webkitEnterFullScreen();
    }else{
      alert("Full screen not supported");
      return;
    }
  }
}

export function createRootSX(theme, sx, params) {
  const {
    isMobile,
    showCover,
    cover,
  } = params

  const style = _.merge(
    {
      position: 'relative',
      backgroundColor: '#eee',
      display: 'flex',
      flexDirection: 'column',

      '& .video, .cover': {
        width: '100%',
        height: '100%',
        aspectRatio: '16/9',
        maxHeight: '100%',
        backgroundColor: '#eee',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'contain',
      },
      '& .video': {
        opacity: showCover ? 0 : 1,
      },
      '& .cover': {
        position: 'absolute',
        zIndex: 2,
        opacity: showCover ? 1 : 0,
        backgroundImage: `url(${cover})`,
      },

      '& .controls': {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '2rem',
        zIndex: '2',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: 'none',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
      },
      '& .controls .control-group': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
      },
      '& .controls .control-group > *': {
        margin: '0 0.5rem',
      },
      '& .volval': {
        color: 'white',
        width: '2.5rem',
        textAlign: 'center',
      },
      '& .fs': {
        display: showCover ? 'none' : 'flex',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
