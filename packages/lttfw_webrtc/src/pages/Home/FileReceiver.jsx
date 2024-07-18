import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { useModal } from 'mui-modal-provider'
import { useTranslation } from 'react-i18next'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

export default function FileReceiver(props) {
  const { sx } = props

  const me = useSelector((state)=>state.users.me)
  const { store, slices } = useStore()
  const ws = useSignal()
  const { t } = useTranslation()

  React.useEffect(()=>{
    me.peer?.on('connection', conn => {
        conn.on('data', data => {
            const blob = new Blob([data.file], {type: data.filetype})
            const url = URL.createObjectURL(blob)
            store.dispatch(slices.files.actions.addFile({
                url,
                filename: data.filename,
                created_at: data.created_at,
                created_by: data.created_by,
            }))
            conn.close()
        })
    })
  }, [me.peer])
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
