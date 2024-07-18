import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'
import StaticText from '../components/StaticText'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import { xpath } from '../helpers'

function KvView(props) {
  const { sx, value, transformers, ...rest } = props

  let data = value
  if (typeof value === 'string') {
    data = JSON.parse(value)
  }
  data = _.isEmpty(data) ? {} : data

  let children = []
  for (let i in transformers) {
    let { key, label, control } = transformers[i]

    let LabelCompt = StaticText
    let ControlCompt = StaticText

    const LabelProps = {
      ...label.props
    }
    const ControlProps = {
      ...control.props
    }

    if (control.component === 'EJS') {
      ControlProps.value = data
      ControlProps.title = null
    } else {
      if (key.startsWith('$.')) {
        ControlProps.value = xpath(data, key)
        ControlProps.title = ControlProps.value
      } else {
        ControlProps.value = data[key]
        ControlProps.title = ControlProps.value
      }
    }

    children.push(
      <TableRow key={uuidv4()} className="field">
        <TableCell>
          <LabelCompt
            className="label"
            title={LabelProps.value}
            {...LabelProps}
          />
        </TableCell>
        <TableCell>
          <ControlCompt className="control" {...ControlProps} />
        </TableCell>
      </TableRow>
    )
  }

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx)
  return (
    <Table sx={rootSX} {...rest}>
      <TableBody>{children}</TableBody>
    </Table>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      '& .MuiTableCell-root': {
        border: 'none',
        padding: '0.25rem'
      },
      '& .MuiTableRow-root .MuiTableCell-root:first-of-type': {
        width: '8rem',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      },
      [theme.breakpoints.down('md')]: {
        '& .MuiTableBody-root': {
          display: 'flex',
          flexDirection: 'column'
        },
        '& .MuiTableRow-root': {
          display: 'flex',
          flexDirection: 'column'
        },
        '& .MuiTableRow-root .MuiTableCell-root:first-of-type': {
          paddingTop: 0
        },
        '& .MuiTableRow-root .MuiTableCell-root:last-of-type': {
          borderBottom: '1px solid #ddd'
        }
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}

export default KvView
