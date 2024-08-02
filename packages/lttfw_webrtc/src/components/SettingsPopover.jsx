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

import Settings from './Settings'

export default function SettingsPopover(props) {
  const { sx } = props

  const [anchorEl, setAnchorEl] = React.useState(null)
  const leftSidebarHidden = useSelector((state)=>state.settings.leftSidebar.hidden)
  const rightSidebarHidden = useSelector((state)=>state.settings.rightSidebar.hidden)

  const { store, slices } = useStore()
  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  const open = Boolean(anchorEl)
  const id = open ? 'settings-popover' : undefined
  return (
    <Box sx={rootSX}>
      <IconButton onClick={handleClick}>
        <i className="fa-solid fa-gear" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Settings />
      </Popover>
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
  const style = _.merge(
    {
      
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
