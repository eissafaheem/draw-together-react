import React from 'react'
import LobbyStyles from './Lobby.module.css'
import lobbyIllustration from './../../../assets/illustration.svg'
import Navbar from '../../components/navbar/Navbar'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import useLobbyHook from './Lobby.hook'

function Lobby() {

  const {createRoom, joinRoom, onChangeInput} = useLobbyHook();

  return (<>
    <Navbar />
    <div className={LobbyStyles['lobby-container']}>
      <div className={LobbyStyles["lobby-content"]}>
        <h2>Unleash Your Creativity  with DrawTogether!</h2>
        <p>Connect, Collaborate, and Create with Others in Real-Time. <br /> Whether you're brainstorming ideas or just having fun, DrawTogether is here to make your whiteboard sessions come alive.</p>
        <div className={LobbyStyles["actions"]}>
          <Button type='primary' text='Draw Now' onClick={createRoom}/>
          <form>
            <Input placeholder='Your room code here...' onChange={onChangeInput}/>
            <Button type='secondary' text="Join" onClick={joinRoom}/>
          </form>
        </div>
      </div>
      <div className={LobbyStyles["illustration"]}>
        <img src={lobbyIllustration} alt="" />
      </div>
    </div>
  </>
  )
}

export default Lobby
