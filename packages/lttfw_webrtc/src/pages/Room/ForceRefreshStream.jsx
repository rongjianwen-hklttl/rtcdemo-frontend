import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'

import { switchStream } from '../../helpers'

export default function ForceRefreshStream(props) {
  const sharingVideoId = useSelector((state)=>state.sharingVideo.id)
  const sharingVideoStream = useSelector((state)=>state.sharingVideo.stream)
  const forceRefresh = useSelector((state)=>state.sharingVideo.forceRefresh)
  const me = useSelector((state)=>state.users.me)

  React.useEffect(()=>{
    if (me.peerId === sharingVideoId && sharingVideoStream) {
      switchStream(sharingVideoStream, me)
    }
  }, [forceRefresh])

  return null;
}