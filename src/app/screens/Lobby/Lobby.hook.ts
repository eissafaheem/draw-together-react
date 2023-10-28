import { useNavigate } from "react-router";
import { ROUTES } from "../../App.routing";
import { useState } from "react";

const useLobbyHook = () =>{

    const navigate = useNavigate();
    const [roomId, setRoomId] = useState<string>("");

    function createRoom(){
        navigate(ROUTES.room+"/eissa")
    }
    
    function joinRoom(event: any){
        event.preventDefault();
        navigate(`${ROUTES.room}/${roomId}`)
    }

    function onChangeInput(event: any){
        setRoomId(event.target.value);
        console.log(event.target.value);
    }

    return {
        createRoom,
        joinRoom,
        onChangeInput
    };
}

export default useLobbyHook;