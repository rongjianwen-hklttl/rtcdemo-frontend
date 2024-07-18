import React from 'react'
import { useSelector } from 'react-redux'
import JSON5 from 'json5'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import rundef from 'rundef'
import Editor from 'react-ace'
import ace from 'ace-builds'
import { StatusBar } from 'ace-builds/src-min-noconflict/ext-statusbar'

import { useMobile } from '@lttfw/core/src/helpers'
import TriggerMenu from './TriggerMenu'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

export default function AceEditor(props) {
  let {
    sx,
    value,
    onChange,
    mode = 'text',
    theme: editorTheme,
    enableStatusBar = true,
    editorId = uuidv4(),
    readOnly = false,
    ...rest
  } = props

  const [toolbarMenu, setToolbarMenu] = React.useState(null)

  function handleChange(value) {
    if (onChange) {
      onChange({ target: { value } })
    }
  }

  const EditorProps = rundef(
    _.merge(
      {
        mode,
        className: 'AceEditor',
        style: {
          flex: 1
        },
        setOptions: {
          useWorker: false,
          showPrintMargin: false,
          fontSize: '16px'
        }
      },
      rest
    )
  )

  if (typeof value === 'object' && value !== null) {
    if (mode == 'json') {
      value = JSON.stringify(value, null, 2)
    }
    if (mode == 'json5') {
      value = JSON5.stringify(value, null, 2)
    }
  }

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile
  })

  const rootRef = React.useRef(null)
  const sbId = editorId + '_status_bar'
  React.useEffect(() => {
    if (rootRef.current) {
      const editor = ace.edit(editorId)
      const statusBar = new StatusBar(editor, document.getElementById(sbId))
      setToolbarMenu({
        id: 'root',
        icon: 'fa-solid fa-bars',
        children: [
          {
            id: 'format',
            label: 'Format',
            icon: 'fa-solid fa-expand',
            action: {
              onClick: function (e, root, popstate) {
                popstate && popstate.close()

                try {
                  const text = JSON.stringify(
                    JSON.parse(editor.getValue()),
                    null,
                    2
                  )
                  editor.setValue(text, -1)
                } catch (e) {
                  return
                }
              }
            }
          }
        ]
      })
    }
  }, [rootRef])

  return (
    <Box ref={rootRef} sx={rootSX}>
      <Editor
        {...EditorProps}
        name={editorId}
        value={value ? value : ''}
        theme={editorTheme ? editorTheme : 'github'}
        onChange={handleChange}
        readOnly={readOnly}
        style={{
          width: '100%',
          height: '100%',
          flex: 1
        }}
      />
      {enableStatusBar && (
        <Box id={sbId} className="ace-statusbar">
          {(mode === 'json' || mode === 'json5') && !readOnly && (
            <Box className="ace-toolbar">
              <TriggerMenu
                menu={toolbarMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              />
            </Box>
          )}
          {readOnly && <Box className="ace-mode">Mode: read-only</Box>}
        </Box>
      )}
    </Box>
  )
}

export function createRootSX(theme, sx, params) {
  const style = _.merge(
    {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '300px',

      '& .ace-statusbar': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0.25rem 0'
      },
      '& .ace_status-indicator': {
        flex: 1,
        textAlign: 'right',
        marginRight: '0.5rem'
      },
      '& .ace-statusbar .MuiIconButton-root': {
        fontSize: '0.85rem'
      },
      '& .ace-statusbar .ace-toolbar': {
        padding: '0 0.25rem',
        marginRight: '0.25rem'
      },
      '& .ace-statusbar .ace-mode': {
        padding: '0 0.25rem',
        marginRight: '0.25rem'
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
