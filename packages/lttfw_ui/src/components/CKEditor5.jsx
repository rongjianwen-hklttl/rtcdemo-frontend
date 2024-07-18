import React from 'react'

import { useEnv } from '@lttfw/core/src/providers/EnvProvider'
import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

import { ClassicEditor } from '@lttfw/ckeditor5'

export default function CKEditor5(props) {
    const { sx, ...rest } = props

    const { ckeditor_upload_url } = useEnv()
    const theme = useTheme()
    const isMobile = useMobile()
    const rootSX = createRootSX(theme, sx, {
        isMobile
    })

    return (
        <Box sx={rootSX}>
            <ClassicEditor uploadUrl={ckeditor_upload_url} {...rest} />
        </Box>
    )
}

export function createRootSX(theme, sx, params) {
    const style = _.merge({
        color: 'initial',
        '& textarea.ck-source-editing-area': {
            backgroundColor: 'initial',
        }
    }, typeof sx === 'function' ? sx(theme) : sx)
  
    return style
}