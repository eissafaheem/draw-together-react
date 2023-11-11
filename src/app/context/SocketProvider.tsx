import React, { ReactNode, useContext } from 'react'
import { createContext } from 'react'
import { io, Socket } from 'socket.io-client';
import { SOCKETIO_URL } from '../utils/urls';

const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = () =>{
    const socket = useContext(SocketContext);
    return socket;
}

type SocketProviderProps = {
    children: ReactNode
}

function SocketProvider(props: SocketProviderProps) {
    const socket = io(SOCKETIO_URL);
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
