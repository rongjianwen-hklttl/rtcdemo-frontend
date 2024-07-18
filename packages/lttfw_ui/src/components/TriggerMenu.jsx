import React from 'react'

import {
  usePopupState,
  bindTrigger,
  bindMenu
} from 'material-ui-popup-state/hooks'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Fade from '@mui/material/Fade'

import NestedList from './NestedList'

export default function TriggerMenu(props) {
  const { className } = props
  const {
    variant = 'popover',
    popupId = 'popover_menu' + uuidv4(),
    menu = null,
    anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
    transformOrigin = { vertical: 'top', horizontal: 'center' },
    sx: _rootSX = {},
    triggerSX: _triggerSX = {},
    nestedListSX: _nestedListSX = {},
    PaperProps = {},
    TriggerComponent = IconButton,
    enableCollapseIcon = false
  } = props

  const popupState = usePopupState({ variant, popupId })

  const theme = useTheme()
  const isMobile = useMobile()

  const rootSX = createRootSX(theme, _rootSX)
  const triggerSX = createTriggerSX(theme, _triggerSX)
  const nestedListSX = createNestedListSX(theme, _nestedListSX)
  return (
    menu && (
      <Box sx={rootSX} className={className}>
        <TriggerComponent {...bindTrigger(popupState)} sx={triggerSX}>
          <i className={menu.icon} title={menu.title ? menu.title : null} />
          {menu.label && (
            <Box component="span" sx={{ marginLeft: '0.5rem' }}>
              {menu.label}
            </Box>
          )}
        </TriggerComponent>
        <Popover
          {...bindMenu(popupState)}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          PaperProps={PaperProps}
          TransitionComponent={Fade}
        >
          <NestedList
            popupState={popupState}
            sx={nestedListSX}
            menu={menu}
            enableCollapseIcon={enableCollapseIcon}
          />
        </Popover>
      </Box>
    )
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge({}, typeof sx === 'function' ? sx(theme) : sx)

  return style
}

export function createTriggerSX(theme, sx, params) {
  const style = _.merge(
    {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}

export function createNestedListSX(theme, sx, params) {
  const style = _.merge(
    {
      minWidth: '12rem'
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
