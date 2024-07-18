import React from 'react'

export default function CustomTabPanel(props) {
  const { children, value, index, ...rest } = props

  return (
    <div
      style={{
        height: 'calc(100% - 56px)', 
        maxHeight: 'calc(100% - 56px)',
        flexDirection: 'column',
        display: value !== index ? 'unset' : 'flex',
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...rest}
    >
      {value === index && children}
    </div>
  )
}