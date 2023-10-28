import React from 'react'
import useRoomHook from './Room.hook'

function Room() {
  
    const {
        params
    } = useRoomHook();
  
    return (
    <div>
      {params.roomId}
    </div>
  )
}

export default Room
