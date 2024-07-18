import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import moment from 'moment'

import Box from '@mui/material/Box'

function Moment(props) {
	const { sx={}, value = null, format, ...rest } = props

	const rootSX = {
		...sx
	}

	let content = null
	if (value !== null) {
		content = moment(value).format(format)
	}
	return (
		<Box sx={rootSX} {...rest} dangerouslySetInnerHTML={{__html: content}} />
	)
}

export default Moment
