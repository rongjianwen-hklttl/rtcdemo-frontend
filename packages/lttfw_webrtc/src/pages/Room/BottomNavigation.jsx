import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useTranslation } from 'react-i18next'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MuiBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
 
export default function BottomNavigation(props) {
  const { sx } = props

  const { store, slices } = useStore()
  const currentTab = useSelector((state)=>state.settings.currentTab)

  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <MuiBottomNavigation
          showLabels
          value={currentTab}
          onChange={(event, newValue) => {
            store.dispatch(slices.settings.actions.set({
              key: 'currentTab',
              value: newValue,
            }))
          }}
          sx={{
            zIndex: 999,
            position: 'absolute',
            width: '100%',
          }}
        >
          <BottomNavigationAction label={t('label-wachord')} value="videoChat" icon={<i className="fa-solid fa-video" />} />
          <BottomNavigationAction label={t('label-users')} value="leftSidebar" icon={<i className="fa-solid fa-users" />} />
          <BottomNavigationAction label={t('label-messages')} value="rightSidebar" icon={<i className="fa-solid fa-comments" />} />
          <BottomNavigationAction label={t('label-control')} value="controlPanel" icon={<i className="fa-solid fa-wrench" />} />
        </MuiBottomNavigation>
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params

  const style = _.merge(
    {
      minHeight: 0,
      height: '3rem',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
