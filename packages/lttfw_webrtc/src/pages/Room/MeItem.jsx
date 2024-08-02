import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import UserItem from './UserItem'

export default function MeItem(props) {
  const { sx } = props
  const user = useSelector((state)=>state.users.me)

  return <UserItem user={user} />
}
