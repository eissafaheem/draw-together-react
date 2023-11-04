import React from 'react'
import useRoomHook from './Room.hook'
import RoomStyles from './Room.module.css'
import Tools from './tools/Tools';

function Room() {

  const {
    canvasRef,
    startDrawing,
    finishDrawing,
    mouseMove,
    setColor
  } = useRoomHook();

  return (
    <div className={RoomStyles['room-container']}>
      <Tools setValue={setColor} canvasRef={canvasRef} />
      <canvas className={RoomStyles['canvas']} onMouseDown={(event)=>startDrawing(event.nativeEvent.offsetX,event.nativeEvent.offsetY)}
        onMouseUp={()=>finishDrawing()}
        onMouseMove={(event)=>mouseMove(
          event.clientX,
          event.clientY,
          event.nativeEvent.offsetX,
          event.nativeEvent.offsetY
          )}
        ref={canvasRef}>
      </canvas>
    </div>
  )
}

export default Room
