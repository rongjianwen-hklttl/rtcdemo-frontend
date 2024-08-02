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
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function LangsPopover(props) {
  const { sx } = props

  const [anchorEl, setAnchorEl] = React.useState(null)
  const lang = useSelector((state)=>state.settings.lang)

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
  const id = open ? 'langs-popover' : undefined
  return (
    <Box sx={rootSX}>
      <IconButton onClick={handleClick}>
        <i className="fa-solid fa-earth-asia" />
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
        <Box sx={{padding: '0.5rem'}}>
          <FormControl>
            <RadioGroup
              value={lang}
              name="radio-buttons-group"
              onChange={handleLangChange}
            >
              <FormControlLabel value="zh_hk" control={<Radio />} label="繁中" />
              <FormControlLabel value="en_hk" control={<Radio />} label="English" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Popover>
    </Box>
  )

  function handleLangChange(e) {
    handleClose()

    const lang = e.target.value
    localStorage.setItem('lang', lang)

    store.dispatch(slices.settings.actions.set({
      key: 'lang',
      value: lang,
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
