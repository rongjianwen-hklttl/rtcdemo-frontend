import React from 'react'

import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

import Header from '../common/Header'
import Footer from '../common/Footer'
import Content from '../common/Content'

export default function Classic(props) {
  const { sx, element } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })
  
  return (
    <Box sx={rootSX}>
      {/*<Header />*/}
      {element}
      {/*
        <Content element={element} />
        <Footer>Footer</Footer>
      */}
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,

      color: theme.main.color,
      backgroundColor: theme.main.bgColor,
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
