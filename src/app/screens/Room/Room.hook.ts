import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSocketContext } from '../../context/SocketProvider';
import { truncate } from 'fs/promises';

const useRoomHook = () => {
    const { roomId } = useParams();
    const [isDrawing, setIsDrawing] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(true)
    const [color, setColor] = useState("white")
    const [myName, setMyName] = useState("User")
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const socket = useSocketContext();
    useEffect(() => {
        prepareCanvas();
        socket?.emit("joinRoom", roomId);
    }, [])

    useEffect(() => {
        addContext();
    }, [color])

    useEffect(() => {
        socket?.on("joinRoom", (roomId) => {
        })
        socket?.on("startDrawing", (data) => {
            const { offsetX, offsetY, color } = data;
            setColor(color)
            startDrawing(offsetX, offsetY, false);
        })
        socket?.on("drawingData", (data) => {
            const { 
                socketId,
                clientX,
                clientY,
                offsetX,
                offsetY,
                color } = data;

            cursorMove(socketId, clientX, clientY)
            mouseMove(clientX, clientY, offsetX, offsetY, false)

        })
        socket?.on("finishDrawing", () => {
            finishDrawing(false);
        })
        socket?.on("clearCanvas", () => {
        })
        socket?.on("cursorMove", (data) => {
            const { socketId, clientX, clientY } = data;
            cursorMove(socketId, clientX, clientY)
        })
    }, [socket])

    const prepareCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        const context = canvas.getContext("2d")
        if (!context) return;
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineWidth = 5;
        contextRef.current = context;
    };

    function cursorMove(socketId: string, clientX: number = 0, clientY: number = 0) {
        let cursor: HTMLElement | null = document.getElementById(socketId);
        if (!cursor) {
            cursor = document.createElement("div");
            cursor.id = socketId;
            cursor.classList.add("cursor")
            document.body.appendChild(cursor)
        }
        cursor.style.left = clientX.toString() + "px";
        cursor.style.top = clientY.toString() + "px";
    }

    function addContext() {
        const canvas = canvasRef.current
        if (!canvas) return;
        const context = canvas.getContext("2d")
        if (!context) return;
        context.strokeStyle = color;
    }

    const startDrawing = (offsetX: number, offsetY: number, isMyAction: boolean = true) => {
        if (!contextRef.current) return;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        if (isMyAction) {
            socket?.emit('startDrawing', { offsetX, offsetY, color });
        }
    };

    const finishDrawing = (isMyAction: boolean = true) => {
        if (!contextRef.current) return;
        contextRef.current.closePath();
        setIsDrawing(false);
        if (isMyAction) {
            socket?.emit('finishDrawing');
        }
    };

    const mouseMove = (clientX: number, clientY: number, offsetX: number, offsetY: number, isMyAction: boolean = true) => {
        if (isMyAction) {
            if (!isDrawing) {
                socket?.emit("cursorMove", { clientX, clientY })
                // cursorMove("jsdfn", clientX, clientY)
                return;
            }
        }
        if (!contextRef.current) return;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        if (isMyAction) {
            socket?.emit('drawingData', { clientX, clientY, offsetX, offsetY, color })
        }
    };

    return {
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        mouseMove,
        setColor,
        setMyName,
        isModalVisible,
        setIsModalVisible,
        myName
    };
}

export default useRoomHook;
