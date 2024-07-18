import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'

export default function TransferFile(props) {
  const { sx, inputProps, close } = props

  const userList = useSelector((state)=>state.users.list)  
  const me = useSelector((state)=>state.users.me)

  return (
    <Input {...inputProps} onChange={handleFileChange} sx={sx} />
  )

  function handleFileChange(event) {
    event.preventDefault()

    const file = event.target.files[0]
    const blob = new Blob(event.target.files, { type: file.type })

    Object.keys(userList).forEach((peerId)=>{
      const conn = me.peer?.connect(peerId)

      conn.on('open', function() {
        conn.send({
          file: blob,
          filename: file.name,
          filetype: file.type,
          created_by: me.userName,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        close()
      })
    })
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {

    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
