import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'

import AceEditor from './AceEditor'

export default function CodeEditor(props) {
  const { sx, readOnly = false, theme: editorTheme, ...rest } = props

  const EditorProps = _.merge(
    {
      mode: 'json5',
      theme: editorTheme,
      editorProps: {
        $blockScrolling: true
      },
      width: '100%',
      height: '100%',
      fontSize: '16px',
      readOnly,
      setOptions: {
        useWorker: false,
        showPrintMargin: false,
        highlightActiveLine: !readOnly,
        setHighlightGutterLine: !readOnly
      }
    },
    rest
  )

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })
  return <AceEditor sx={rootSX} {...EditorProps} />
}

export function createRootSX(theme, sx, params) {
  const style = _.merge({}, typeof sx === 'function' ? sx(theme) : sx)

  return style
}
