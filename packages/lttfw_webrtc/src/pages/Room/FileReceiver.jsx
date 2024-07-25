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

window.__fileList = {

}

export default function FileReceiver(props) {
  const { sx } = props

  const me = useSelector((state)=>state.users.me)
  const { store, slices } = useStore()
  const ws = useSignal()
  const { t } = useTranslation()

  React.useEffect(()=>{
    me.peer?.on('connection', conn => {
        conn.on('data', data => {
          const {
            id,
            blob, 
            blobLength,
            chunkIndex,
            numOfChunk,
            filename,
            filesize,
            filetype,
            created_by,
            created_at,
            type,
          } = data

          if (typeof window.__fileList[id] === 'undefined') {
            window.__fileList[id] = {
              filename,
              filesize,
              filetype,
              created_by,
              created_at,
              numOfChunk,
              chunks: []
            }
          }

          window.__fileList[id].chunks.push({
            chunkIndex,
            chunk: blob,
          })

          store.dispatch(slices.files.actions.addChunk({
            id,
            filename,
            filesize,
            filetype,
            created_by,
            created_at,
            chunkIndex,
            numOfChunk,
          }))

          if (window.__fileList[id].chunks.length === numOfChunk) {
            window.__fileList[id].chunks.sort((a, b)=>a.chunkIndex - b.chunkIndex)

            const chunks = window.__fileList[id].chunks.map((o)=>o.chunk)

            const url = URL.createObjectURL(new Blob(chunks, {type: window.__fileList[id].filetype}))
            delete window.__fileList[id]

            store.dispatch(slices.files.actions.updateFile({
              id,
              url,
            }))
          }
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
