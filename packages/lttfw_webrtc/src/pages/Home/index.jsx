import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import Header from '../../layouts/common/Header'

export default function Home(props) {
  const { sx } = props

  const navigate = useNavigate()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <>
      <Header />
      <Box sx={rootSX}>
        <h1>Home</h1>
        <Box><Button variant="contained" onClick={handleStart}>Start</Button></Box>
      </Box>
    </>
  )

  function handleStart() {
    navigate('/login')
  }
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      minHeight: 0,
      flex: 1,
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
