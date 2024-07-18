import React from 'react'
import { CKEditor as Editor } from 'ckeditor4-react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { useEnv } from '@lttfw/core/src/providers/EnvProvider'
import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

export default function CKEditor4(props) {
  const {
    sx,
    value,
    readOnly = false,
    fill_parent = false,
    onChange,
    config,
    ...rest
  } = props

  const env = useEnv()
  const { basename } = env

  const EditorProps = {
    ...rest,
    //initData: value,
    editorUrl: basename + '/assets/ckeditor4/ckeditor.js',
    onChange: handleChange,
    onInstanceReady: handleInstanceReady,
    config: _.merge(
      {
        flex: 1,
        readOnly
      },
      config
    )
  }
  
  const [editorInstance, setEditorInstance] = React.useState(null)
  React.useEffect(()=>{
    if (editorInstance && editorInstance.getData() !== value) {
      editorInstance.setData(value)
    }
  }, [value])

  if (EditorProps.config.readOnly) {
    EditorProps.config.toolbarGroups = [
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      {
        name: 'editing',
        groups: ['find', 'selection', 'spellchecker', 'editing']
      },
      { name: 'forms', groups: ['forms'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      {
        name: 'paragraph',
        groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']
      },
      { name: 'links', groups: ['links'] },
      { name: 'insert', groups: ['insert'] },
      { name: 'styles', groups: ['styles'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'about', groups: ['about'] }
    ]
    EditorProps.config.removeButtons =
      'Maximize,Flash,ShowBlocks,BGColor,TextColor,Styles,Format,Font,FontSize,Iframe,PageBreak,SpecialChar,Smiley,HorizontalRule,Table,Image,Link,Unlink,Anchor,Language,BidiRtl,BidiLtr,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CreateDiv,Blockquote,Outdent,Indent,BulletedList,NumberedList,CopyFormatting,RemoveFormat,Italic,Bold,Underline,Strike,Subscript,Superscript,Select,Button,ImageButton,HiddenField,TextField,Radio,Checkbox,Form,Scayt,SelectAll,Find,Replace,Textarea,Redo,Cut,Undo,Copy,Paste,PasteText,PasteFromWord,ExportPdf,NewPage,Save,Templates'
    EditorProps.config.allowedContent = true
  } else {
    EditorProps.config.removeButtons = 'Maximize,Flash,Language'
  }

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    fill_parent,
    isMobile
  })

  return (
    <Box sx={rootSX}>
      <Editor {...EditorProps} />
    </Box>
  )

  function handleChange(e) {
    if (onChange) {
      onChange({ target: { value: e.editor.getData() } })
    }
  }

  function handleInstanceReady(e) {
    setEditorInstance(e.editor)
  }
}

export function createRootSX(theme, sx, params) {
  const { fill_parent } = params
  const style = _.merge(
    {
      display: 'flex',
      flexDirection: 'column',
      flex: fill_parent ? 1 : 'unset',

      '& .cke.cke_reset': {
        display: 'flex',
        flexDirection: 'column',
        flex: fill_parent ? 1 : 'unset'
      },
      '& .cke_inner.cke_reset': {
        display: 'flex',
        flexDirection: 'column',
        flex: fill_parent ? 1 : 'unset'
      },
      '& .cke_contents.cke_reset': {
        display: 'flex',
        flexDirection: 'column',
        flex: fill_parent ? 1 : 'unset'
      }
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
