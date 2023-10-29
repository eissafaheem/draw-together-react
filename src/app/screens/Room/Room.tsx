import React from 'react'
import useRoomHook from './Room.hook'
import RoomStyles from './Room.module.css'
import Tools from './tools/Tools';

function Room() {
  
    const {

      canvasRef,
      startDrawing,
      finishDrawing,
      clearCanvas,
      draw,
      setColor
    } = useRoomHook();
  
    return (
    <div className={RoomStyles['room-container']}>
      <Tools setValue={setColor}/>
      <canvas className={RoomStyles['canvas']} onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}> 
      </canvas>
    </div>
  )
}

export default Room
