import React from 'react'
import { useSelector } from 'react-redux'

import { useLayout } from '@lttfw/core/src/providers/LayoutProvider'
import { useStore } from '@lttfw/core/src/providers/StoreProvider'

export default function NotFound(props) {
  const layoutName = useLayout()
  const { store, slices } = useStore()

  return 'NotFound'
}
