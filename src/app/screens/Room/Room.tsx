import React from 'react'
import useRoomHook from './Room.hook'
import RoomStyles from './Room.module.css'
import Tools from './tools/Tools';
import UserDetailsModal from '../../components/userDetailsModal/UserDetailsModal';

function Room() {

  const {
    canvasRef,
    startDrawing,
    finishDrawing,
    mouseMove,
    setColor,
    setMyName,
    isModalVisible,
    setIsModalVisible,
    myName
  } = useRoomHook();

  return (
    <div className={RoomStyles['room-container']}>
      {
        isModalVisible &&
        <UserDetailsModal setUserDetails={setMyName} setIsModalVisible={setIsModalVisible} />
      }
      <Tools setValue={setColor} canvasRef={canvasRef} />
      <canvas className={RoomStyles['canvas']} onMouseDown={(event) => startDrawing(event.nativeEvent.offsetX, event.nativeEvent.offsetY)}
        onMouseUp={() => finishDrawing()}
        onMouseMove={(event) => mouseMove(
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
