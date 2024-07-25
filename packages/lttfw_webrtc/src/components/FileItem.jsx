import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'
import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/Box'

import { downloadURI } from '../helpers'

export default function FileItem(props) {
  const { sx, file } = props

  const { store, slices } = useStore()

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
    progress: file.progress,
  })
  return (
    <Box sx={rootSX} className={file.status}>
      <Box className="file">
        <Box className="filename">{ file.filename }</Box>
        { file.url &&
          <IconButton onClick={handleClick}>
            <i className="fa-solid fa-cloud-arrow-down" />
          </IconButton>
        }
      </Box>
      { file.progress < 1 &&
        <Box className="progress">
          <Box className="label">
            { Math.floor(file.progress * 100) }%
          </Box>
        </Box>
      }
      <Box className="sender">
        <Box className="created_by">{ file.created_by }</Box>
        <Box className="created_at">{ moment(file.created_at).format("HH:mm") }</Box>
      </Box>
    </Box>
  )

  function handleClick() {
    const { filename, url } = file
    downloadURI(url, filename)
/*
    const { filename, blob } = file

    store.dispatch(slices.files.actions.clearBlob({
      id: file.id
    }))

    setTimeout(()=>{
      const url = URL.createObjectURL(new Blob(blob, {
        type: file.filetype,
      }))
      downloadURI(url, filename)
      URL.revokeObjectURL(blob)
    }, 100)
*/
  }
}

export function createRootSX(theme, sx, params) {
  const {
    isMobile, 
    progress,
  } = params

  const style = _.merge(
    {
      display: 'block',
      position: 'relative',
      margin: '0.5rem',
      padding: '0.5rem 0.75rem',
      borderColor: 'transparent',
      borderRadius: '1rem',
      borderWidth: '1px',
      borderStyle: 'solid',
      backgroundColor: '#f2f2f2',
      color: '#7d7d7d',
      
      '& .file': {
        display: 'flex',
        flexDirection: 'row',
      },
      '& .filename': {
        flex: 1,
        paddingRight: '0.5rem',
        display: '-webkit-box',
        wordBreak: 'break-all',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
        height: '3rem',
        lineHeight: '1.5',
        overflow: 'hidden',
      },
      '& .progress': {
        width: Math.floor(progress*100)+'%',
        backgroundColor: progress >= 1 ? 'green' : 'red',
        height: '1.2rem',
        borderRadius: '2rem',
        margin: '0.5rem 0',
        fontSize: '11px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '& .progress .label': {
        position: 'absolute',
        color: 'white',
      },
      '& .sender': {
        display: 'flex',
        flexDirection: 'row',
      },
      '& .created_by': {
        flex: 1,
        fontSize: '12px',
        textAlign: 'text',
        color: 'rgb(102, 119, 129)',
        display: '-webkit-box',
        wordBreak: 'break-all',
        '-webkit-line-clamp': '1',
        '-webkit-box-orient': 'vertical',
        height: '1rem',
        overflow: 'hidden',
      },
      '& .created_at': {
        flex: 1,
        fontSize: '12px',
        textAlign: 'right',
        color: 'rgb(102, 119, 129)',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
