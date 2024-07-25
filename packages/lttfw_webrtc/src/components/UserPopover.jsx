import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import copy from 'copy-to-clipboard'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useMobile } from '@lttfw/core/src/helpers'
import { useSignal } from '../providers/SignalProvider'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function UserPopover(props) {
  const { sx } = props

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  
  const me = useSelector((state)=>state.users.me)

  const ws = useSignal()
  const navigate = useNavigate()
  const { roomName, userName } = useParams()
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
  const id = open ? 'user-popover' : undefined

  const menuItems = [{
    label: 'Share',
    icon: 'fa-solid fa-share-nodes',
    click: function(e, o) {
      setAnchorEl(null)
      setDialogOpen(true)
      copy(window.location.protocol+"//"+window.location.hostname+"/session/"+roomName)
    }
  },{
    label: 'Exit',
    icon: 'fa-solid fa-right-from-bracket',
    click: function(e, o) {
      setAnchorEl(null)
      ws.close()
      const tracks = me.stream.getTracks()
      tracks.forEach(track => track.stop())
      setTimeout(()=>{
        navigate('/')
      }, 100)
    }
  }]
  return (
    <Box sx={rootSX}>
      <Button onClick={handleClick}>
        { !_.isEmpty(window.location.search) && <Avatar alt={userName} src={"https://avataaars.io/"+window.location.search} /> }
      </Button>
      <Dialog
        open={dialogOpen}
        keepMounted
        onClose={handleDialogClose}
      >
        <DialogTitle>Copy share link to clipboard successfully.</DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
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
        <Paper sx={{ width: '16rem', maxWidth: '100%' }}>
          <MenuList>
            {menuItems.map((o)=>
              <MenuItem key={uuidv4()} onClick={(e)=>o.click(e, o)}>
                { o.icon &&
                  <ListItemIcon>
                    <i className={o.icon} />
                  </ListItemIcon>
                }
                <ListItemText>{o.label}</ListItemText>
              </MenuItem>
            )}
          </MenuList>
        </Paper>
      </Popover>
    </Box>
  )

  function handleDialogClose() {
    setDialogOpen(false)
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
