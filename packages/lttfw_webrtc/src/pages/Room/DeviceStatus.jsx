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

import RefreshStreamButton from './RefreshStreamButton'

export default function DeviceStatus(props) {
  const { className, user, stream } = props

  const hasVideoTrack = stream?.getVideoTracks().length > 0
  const hasAudioTrack = stream?.getAudioTracks().length > 0

  return (
    <Box className={className}>
      <Box>
        <IconButton variant="contained" disabled={true}>
          <Box sx={{position: 'relative'}}>
            { !hasVideoTrack &&
              <i className="fa-solid fa-times" />
            }
            <i className="fa-solid fa-camera" />
          </Box>
        </IconButton>
      </Box>
      <Box>
        <IconButton variant="contained" disabled={true}>
          <Box sx={{position: 'relative'}}>
            { !hasAudioTrack &&
              <i className="fa-solid fa-times" />
            }
            <i className="fa-solid fa-microphone" />
          </Box>
        </IconButton>
      </Box>
      <Box>
        <RefreshStreamButton peerId={user.peerId} />
      </Box>
    </Box>
  )
}
