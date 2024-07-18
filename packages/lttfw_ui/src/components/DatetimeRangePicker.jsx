import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import DatetimePicker from './DatetimePicker'

function DatetimeRangePicker(props) {
  return <DatetimePicker {...props} mode={'range'} />
}

export default DatetimeRangePicker
