import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'

import { useTranslation } from 'react-i18next'
import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MuiBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
 
export default function LsNavigation(props) {
  const { sx } = props

  const { store, slices } = useStore()
  const currentLsTab = useSelector((state)=>state.settings.currentLsTab)

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
          value={currentLsTab}
          onChange={(event, newValue) => {
            store.dispatch(slices.settings.actions.set({
              key: 'currentLsTab',
              value: newValue,
            }))
          }}
          sx={{
            zIndex: 999,
            position: 'absolute',
            width: '100%',
          }}
        >
          <BottomNavigationAction label={t('label-users')} value="lsUsers" icon={<i className="fa-solid fa-users" />} />
          <BottomNavigationAction label={t('label-control')} value="lsControlPanel" icon={<i className="fa-solid fa-wrench" />} />
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
