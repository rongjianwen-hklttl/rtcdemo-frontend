import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import MobileContent from './MobileContent'
import DesktopContent from './DesktopContent'

export default function MainContent(props) {
  const { sx } = props

  const isMobile = useMobile()

  return isMobile ? <MobileContent /> : <DesktopContent />
}

