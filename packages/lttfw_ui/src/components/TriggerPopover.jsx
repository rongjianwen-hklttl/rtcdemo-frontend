import React from 'react'

import {
  usePopupState,
  bindTrigger,
  bindPopover
} from 'material-ui-popup-state/hooks'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Fade from '@mui/material/Fade'

export default function TriggerPopover(props) {
  const {
    sx,
    popoverSX,
    icon,
    content,
    IconComponent,
    ContentComponent,
    PaperProps = {},
    anchorOrigin = {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin = {
      vertical: 'top',
      horizontal: 'left'
    },
    ...rest
  } = props

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popover_' + uuidv4()
  })

  return (
    <Box className="trigger-popover" sx={sx}>
      {IconComponent ? (
        <IconComponent {...bindTrigger(popupState)} />
      ) : (
        <IconButton {...bindTrigger(popupState)}>{icon}</IconButton>
      )}
      <Popover
        sx={popoverSX}
        {...bindPopover(popupState)}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        slotProps={{
          paper: PaperProps
        }}
        disableEnforceFocus={true}
        TransitionComponent={Fade}
      >
        {ContentComponent ? (
          <ContentComponent popupState={popupState} {...rest} />
        ) : (
          content
        )}
      </Popover>
    </Box>
  )
}
