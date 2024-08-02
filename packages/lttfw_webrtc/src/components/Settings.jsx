import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

export default function Settings(props) {
  const { sx } = props

  const leftSidebarHidden = useSelector((state)=>state.settings.leftSidebar.hidden)
  const rightSidebarHidden = useSelector((state)=>state.settings.rightSidebar.hidden)

  const { store, slices } = useStore()
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Box sx={rootSX}>
      <FormGroup>
        <FormControlLabel control={<Checkbox onChange={(e)=>showModule(e, 'leftSidebar')} checked={!leftSidebarHidden} />} label="Show users" />
        <FormControlLabel control={<Checkbox onChange={(e)=>showModule(e, 'rightSidebar')} checked={!rightSidebarHidden} />} label="Show messages" />
      </FormGroup>
    </Box>
  )
  
  function showModule(e, moduleName) {
    store.dispatch(slices.settings.actions.setSub({
      key: moduleName,
      subKey: 'hidden',
      value: !e.target.checked,
    }))
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      padding: '0.5rem',
      minWidth: isMobile ? '100%' : '12rem',
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
