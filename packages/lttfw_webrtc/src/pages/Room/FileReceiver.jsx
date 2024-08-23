import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { useModal } from 'mui-modal-provider'
import { useTranslation } from 'react-i18next'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useSignal } from '../../providers/SignalProvider'
import { usePeer } from '../../providers/PeerProvider'

import { useMobile } from '@lttfw/core/src/helpers'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

const __fileList__ = {}
window.__fileList__ = __fileList__

export default function FileReceiver(props) {
  const { sx } = props

  const { store, slices } = useStore()
  const { ws } = useSignal()
  const { t } = useTranslation()
  const currentPeer = usePeer()

  React.useEffect(()=>{
    currentPeer.on('connection', conn => {
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

          if (typeof __fileList__[id] === 'undefined') {
            __fileList__[id] = {
              filename,
              filesize,
              filetype,
              created_by,
              created_at,
              numOfChunk,
              chunks: []
            }
          }

          __fileList__[id].chunks.push({
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

          if (__fileList__[id].chunks.length === numOfChunk) {
            __fileList__[id].chunks.sort((a, b)=>a.chunkIndex - b.chunkIndex)

            const chunks = __fileList__[id].chunks.map((o)=>o.chunk)

            const url = URL.createObjectURL(new Blob(chunks, {type: __fileList__[id].filetype}))
            delete __fileList__[id]

            store.dispatch(slices.files.actions.updateFile({
              id,
              url,
            }))
          }
        })
    })

    return ()=>{
      currentPeer.off('connection')
    }
  }, [])
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
