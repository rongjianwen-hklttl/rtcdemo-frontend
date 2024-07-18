import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import MuiTabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import TabPanel from './TabPanel'

export default function Tabs(props) {
  const {
    sx,
    innerRef,
    enableResizer = false,
    Resizer = null,
    panels = []
  } = props

  const [currentTabIndex, setCurrentTabIndex] = React.useState(0)

  const { store, slices } = useStore()

  const handleChange = (event, index) => {
    setCurrentTabIndex(index)
  }

  const theme = useTheme()
  const isMobile = useMobile()

  const rootSX = createRootSX(theme, sx)
  return (
    <Box className="tabs-root" sx={rootSX}>
      <MuiTabs
        className="tabs"
        value={currentTabIndex}
        onChange={handleChange}
      >
        {panels.map((o) => (
          <Tab key={uuidv4()} label={o.label} />
        ))}
      </MuiTabs>
      {enableResizer && Resizer && <Resizer innerRef={innerRef} />}
      {panels.map((o) => (
        <TabPanel
          className="tabpanel-root"
          key={uuidv4()}
          value={currentTabIndex}
          index={o.index}
        >
          <Box className="tabpanel">{o.element}</Box>
        </TabPanel>
      ))}
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      position: 'relative'
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
