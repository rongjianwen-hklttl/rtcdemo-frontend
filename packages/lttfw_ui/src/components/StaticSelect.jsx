import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import Fade from '@mui/material/Fade'

function ButtonGroupMulti(props) {
	const {
		sx,
		variant,
		options,
		value,
		onChange,
		multiple = false
	} = props

	return (
		<ButtonGroup sx={sx} variant={variant}>
			{ !multiple &&
				<Button key={uuidv4()} 
					onClick={(e)=>handleClick(e, null)} 
					className={clsx((value==-1||value==''||value==null) && 'MuiButton-actived')}>
					All
				</Button>
			}
	  		{ options.map((opt)=>{
	  			let actived = false
	  			if (multiple) {
	  				const val = multiple && !Array.isArray(value) ? value.split(',') : value
	  				actived = val.find((o)=>o==opt.value)
	  			} else {
	  				actived = value==opt.value
	  			}
	  			return <Button key={uuidv4()} onClick={(e)=>handleClick(e, opt)} className={clsx(actived && 'MuiButton-actived')}>{opt.display_name}</Button>
	  		}
	  		)}
		</ButtonGroup>
	)

	function handleClick(e, opt) {
		let val = multiple ? (!Array.isArray(value) ? value.split(',') : _.cloneDeep(value)) : (opt ? opt.value : null)
		if (multiple) {
			if (val.find((o)=>o==opt.value)) {
				val = val.filter((o)=>o!=opt.value)
			} else {
				val.push(opt.value)
			}
		}
		onChange({...e, target: {...e.target, value: val}}, val)
	}
}

function StaticSelect(props) {
	const {
		sx={},
		variant=null,
		value,
		options,
		onChange,
		displayEmpty = true,
		placeholder = '請選擇',
		multiple = false,
		...rest
	} = props

	const rootSX = (theme)=>({
		'& .MuiSelect-select': {
			padding: '8px 8px',	
		},
		'& .MuiButton-actived': {
			backgroundColor: theme.colors.primaryYellow,
		},
		'& .placeholder': {
			fontStyle: theme.placeholder.fontStyle,
			color: theme.placeholder.color,
		},
		...sx,
	})

	if (variant == 'outlined') {
		return <ButtonGroupMulti {...props} sx={rootSX} />
	}

	const val = multiple && !Array.isArray(value) ? value.split(',') : value
	console.debug(val)
	return (
		<Select
			displayEmpty={displayEmpty}
			multiple={multiple}
			value={val}
			sx={rootSX}
			onChange={handleChange}
			renderValue={renderValue}
			MenuProps={{
				transitionDuration: 0,
				id: uuidv4(),
			}}
			{...rest}>
			{ displayEmpty &&
				<MenuItem value="">
	            	<Box className='placeholder'>{placeholder}</Box>
	          	</MenuItem>
	      	}
			{ options.map((o)=>
				<MenuItem key={uuidv4()} value={o.value}>
					{ multiple && 
						<Checkbox checked={multiple && Array.isArray(value) ? value.find((v)=>v==o.value) : ( value == o.value )} />
					}
						<ListItemText primary={o.display_name} />
				</MenuItem>)
			}
		</Select>
	)

	function renderValue(selected) {
		if (multiple) {
			let result = []
			for (let i in selected) {
				let res = _.find(options, (opt)=>opt.value == selected[i])
				if (!res) {
					continue
				}
				result.push(res.display_name)
			}
			return result.join(', ')
		}

		let res = _.find(options, (opt)=>opt.value == selected)
		return res ? res.display_name : <Box className='placeholder'>{placeholder}</Box>
	}

	function handleChange(e) {
		const { target: { value } } = e
		if (multiple) {
			onChange(e, typeof value === 'string' ? value.split(',') : value)
		} else {
			onChange(e, value)
		}
	}

	function handleClick(e, o) {
		if (!o) {
			onChange({...e, target: {...e.target, value: ''}}, '')
		} else {
			onChange({...e, target: {...e.target, value: o.value}}, o.value)	
		}
	}
}

export default StaticSelect
