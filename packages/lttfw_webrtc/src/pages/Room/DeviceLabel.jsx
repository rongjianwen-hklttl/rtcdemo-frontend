import React from 'react'
import { useSelector } from 'react-redux'

import { mobileAndTabletCheck } from '../../helpers'

export default function DeviceLabel(props) {
  const { deviceId, deviceType, ...rest } = props
  const devices = useSelector((state)=>state.devices[deviceType])

  const isMobileDevice = mobileAndTabletCheck()
  if (isMobileDevice) {
    const mapping = {'user': 'Front camera','environment': 'Back camera'}
    return <label {...rest}>{mapping[deviceId] || 'Not in use'}</label>
  }

  const d = _.find(devices, (o)=>o.deviceId == deviceId)
  const label = !deviceId ? 'Not in use' : (d ? d.label : 'Unknown')
  return <label {...rest}>{label}</label>
}