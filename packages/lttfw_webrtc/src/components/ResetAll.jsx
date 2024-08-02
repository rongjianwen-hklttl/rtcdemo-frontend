import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import _ from 'lodash'

import { useStore } from '@lttfw/core/src/providers/StoreProvider'

export default function ResetAll(props) {
  const { store, slices } = useStore()
  
  React.useEffect(()=>{
    store.dispatch(slices.users.actions.reset())
  }, [])
}
