import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useEngine } from '@lttfw/core/src/providers/EngineProvider'
import { useMobile, useRoute } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import Collapse from '@mui/material/Collapse'

function NestedListItem(props) {
  const {
    popupState,
    sx,
    menu,
    depth,
    enableCollapseIcon,
    onCollapseClick,
    userData,
  } = props

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { store, slices } = useStore()
  const route = useRoute()
  const location = useLocation()
  const uriParams = useParams()
  const { components } = useEngine()

  const MenuProps = menu.props ? menu.props : {}
  const RadioProps = MenuProps.RadioProps
  const CheckboxProps = MenuProps.CheckboxProps
  const ListItemButtonProps = _.cloneDeep(MenuProps)
  delete ListItemButtonProps.RadioProps
  delete ListItemButtonProps.CheckboxProps

  if (menu.type == 'category') {
    ListItemButtonProps.disabled = true
    ListItemButtonProps.className = 'NestedListItem-category'
  } else {
    if (menu.type != 'custom') {
      ListItemButtonProps.onClick = function(e) {
        setTimeout(() => handleItemClick(e, menu, popupState, userData), 0)
      }  
    }
  }

  const display_text = t(menu.display_name ? menu.display_name : menu.label)
  const Compt = (components && components[menu.component]) ? components[menu.component] : Button
  
  return (
    <>
      <ListItemButton
        className={
          'NestedListItem' + (menu.active ? ' NestedListItem-active' : '')
        }
        {...ListItemButtonProps}
      >
        {menu.icon && (
          <ListItemIcon>
            <i className={menu.icon} />
          </ListItemIcon>
        )}
        {menu.type == 'radio' && (
          <FormControlLabel
            {...MenuProps}
            value={menu.name}
            control={<Radio {...RadioProps} />}
            label={display_text}
            onChange={(e) => handleFormControlChange(e, menu, popupState, userData)}
          />
        )}
        {menu.type == 'checkbox' && (
          <FormControlLabel
            {...MenuProps}
            value={menu.name}
            control={<Checkbox {...CheckboxProps} />}
            label={display_text}
            onChange={(e) => handleFormControlChange(e, menu, popupState, userData)}
          />
        )}
        {menu.type == 'component' && (
          <Compt {...MenuProps} menu={menu} popupState={popupState}>{display_text}</Compt>
        )}
        {(typeof menu.type === 'undefined' ||
          menu.type == 'text' ||
          menu.type == 'category') && (
          <ListItemText primary={display_text} {...menu.props} />
        )}
        {enableCollapseIcon && !_.isEmpty(menu.children) && (
          <Button
            className="NestedListItem-collapse_icon"
            sx={collapseIconSX}
            disableRipple={true}
            onClick={(e) => onCollapseClick && onCollapseClick(e, menu)}
          >
            {!menu.collapsed ? (
              <i className="icon-right fas fa-chevron-up" />
            ) : (
              <i className="icon-right fas fa-chevron-down" />
            )}
          </Button>
        )}
      </ListItemButton>
      { menu.children && (
        <Collapse in={!menu.collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding depth={depth + 1} sx={sx}>
            {menu.children.map((child) => (
              <NestedListItem
                key={uuidv4()}
                popupState={popupState}
                menu={child}
                depth={depth + 1}
                enableCollapseIcon={enableCollapseIcon}
                onCollapseClick={onCollapseClick}
                userData={userData}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )

  function handleItemClick(e, root, popupState, userData) {
    if (root.action && root.action.type == 'navigate') {
      processAction(e, root, popupState, () => {
        navigate(root.action.to)

      }, userData)
    } else if (root.action && root.action.type == 'custom') {
      processAction(e, root, popupState, () => {

      }, userData)
    } else if (root.action && typeof root.action.onClick === 'function') {
      processAction(e, root, popupState, root.action.onClick, userData)
    }
  }

  function handleFormControlChange(e, root, popupState, userData) {
    if (root.action && typeof root.action.onChange === 'function') {
      processAction(e, root, popupState, root.action.onChange, userData)
    }
  }

  function processAction(e, root, popupState, callback, userData) {
    const prepare = root.action.prepare
    if (prepare) {
      if (prepare.slices) {
        for (let i in prepare.slices) {
          const { name, action, payload = null } = prepare.slices[i]
          if (slices[name] && slices[name].actions[action]) {
            store.dispatch(
              slices[name].actions[action]({
                ...payload,
                __userData: {
                  route,
                  location,
                  uriParams,
                  menuItem: root
                }
              })
            )
          }
        }
      }
    }

    if (callback) {
      callback(e, root, popupState, userData)
    } else {
      popupState && popupState.close()
    }

    if (userData.postClick) {
      userData.postClick(e, root, popupState, userData)
    }
  }
}
/*
switch (root.action.type) {
  case 'navigate': {
    navigate(root.action.to, root.action.options)
    break
  }
  case 'func': {
    if (typeof root.action.onClick === 'function') {
      root.action.onClick(e, root, popupState)
    }
    break
  }
}
*/

export default function NestedList(props) {
  const {
    popupState,
    sx,
    menu,
    depth = 0,
    enableCollapseIcon = true,
    onCollapseClick = null,
    userData = {},
  } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx)
  return (
    <List sx={rootSX} component="nav" disablePadding depth={depth}>
      {menu.children &&
        menu.children.map((child) => (
          <NestedListItem
            key={uuidv4()}
            popupState={popupState}
            menu={child}
            depth={depth}
            sx={rootSX}
            enableCollapseIcon={enableCollapseIcon}
            onCollapseClick={onCollapseClick}
            userData={userData}
          />
        ))}
    </List>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      '& [depth="0"]': {
        paddingLeft: '0rem'
      },
      '& [depth="1"]': {
        paddingLeft: '0.75rem'
      },
      '& [depth="2"]': {
        paddingLeft: '1.5rem'
      },
      '& [depth="3"]': {
        paddingLeft: '2.25rem'
      },
      '& [depth="4"]': {
        paddingLeft: '3rem'
      },
      '& [depth="5"]': {
        paddingLeft: '3.75rem'
      },
      '& [depth="6"]': {
        paddingLeft: '4.25rem'
      },
      '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginLeft: '0.5rem',
        color: 'inherit'
      },
      '& .MuiFormControlLabel-root': {
        marginLeft: 0,
        marginRight: 0
      },
      '& .MuiListItemButton-root': {
        padding: 0
      },
      '& .MuiListItemButton-root .MuiListItemText-root': {
        padding: '0.5rem'
      },
      '& .NestedListItem-category': {
        opacity: '1'
      },
      '& .NestedListItem-collapse_icon': {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: 0,
        width: '3rem',
        textAlign: 'center',
        minWidth: 0,
        color: 'inherit'
      },
      '& .NestedListItem-category .MuiTypography-root': {
        opacity: '1',
        fontSize: '1rem',
        fontWeight: 'bold'
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}

export function collapseIconSX(theme, sx, params) {
  const style = _.merge(
    {
      margin: 0,
      padding: '0 0.25rem',
      fontSize: '1.2rem'
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
