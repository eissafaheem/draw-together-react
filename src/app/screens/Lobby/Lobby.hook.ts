import { useNavigate } from "react-router";
import { ROUTES } from "../../App.routing";
import { useState } from "react";
import { generateUniqueRoomId } from "../../utils/generator";

const useLobbyHook = () => {

    const navigate = useNavigate();
    const [roomId, setRoomId] = useState<string>("");

    function createRoom() {
        const generatedRoomID = generateUniqueRoomId();
        navigate(`${ROUTES.room}/${generatedRoomID}`)
    }

    function joinRoom(event: any) {
        event.preventDefault();
        if (roomId) navigate(`${ROUTES.room}/${roomId}`)
    }

    function onChangeInput(event: any) {
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