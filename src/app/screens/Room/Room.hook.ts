import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSocketContext } from '../../context/SocketProvider';
import { truncate } from 'fs/promises';
import { userColors } from '../../utils/colors';

const useRoomHook = () => {
    const { roomId } = useParams();
    const [isDrawing, setIsDrawing] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(true)
    const [color, setColor] = useState("white")
    const [myName, setMyName] = useState("User")
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    let userColorIndex = 0;
    let joinedUserSocketIds: string[] = [];

    const socket = useSocketContext();
    useEffect(() => {
        prepareCanvas();
        socket?.emit("joinRoom", roomId);

        return () => {
            console.log(joinedUserSocketIds)
            for (let i = 0; i < joinedUserSocketIds.length; i++) {
                const element = document.getElementById(joinedUserSocketIds[i]);
                element?.remove();
                console.log(element);
            }
        }
    }, [])

    useEffect(() => {
        addContext();
    }, [color])


    useEffect(() => {
        const handleJoinRoom = (roomId: any) => {
        };

        const handleStartDrawing = (data: any) => {
            const { offsetX, offsetY, color } = data;
            setColor(color)
            startDrawing(offsetX, offsetY, false);
        };

        const handleDrawingData = (data: any) => {
            const {
                socketId,
                myName,
                clientX,
                clientY,
                offsetX,
                offsetY,
                color } = data;

            cursorMove(socketId, myName, clientX, clientY)
            mouseMove(clientX, clientY, offsetX, offsetY, false)
        };

        const handleFinishDrawing = () => {
            finishDrawing(false);
        };

        const handleClearCanvas = () => {
        };

        const handleCursorMove = (data: any) => {
            const { socketId, myName, clientX, clientY } = data;
            cursorMove(socketId, myName, clientX, clientY)
        };

        // Register events
        socket?.on("joinRoom", handleJoinRoom);
        socket?.on("startDrawing", handleStartDrawing);
        socket?.on("drawingData", handleDrawingData);
        socket?.on("finishDrawing", handleFinishDrawing);
        socket?.on("clearCanvas", handleClearCanvas);
        socket?.on("cursorMove", handleCursorMove);

        // Unregister events in the cleanup function
        return () => {
            socket?.off("joinRoom", handleJoinRoom);
            socket?.off("startDrawing", handleStartDrawing);
            socket?.off("drawingData", handleDrawingData);
            socket?.off("finishDrawing", handleFinishDrawing);
            socket?.off("clearCanvas", handleClearCanvas);
            socket?.off("cursorMove", handleCursorMove);
        };
    }, [socket]);

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
        context.lineWidth = 3;
        contextRef.current = context;
    };

    function cursorMove(socketId: string, myName: string, clientX: number = 0, clientY: number = 0) {
        let cursor: HTMLElement | null = document.getElementById(socketId);
        if (!cursor) {
            cursor = document.createElement("div");
            cursor.id = socketId;
            cursor.classList.add("cursor");
            cursor.style.borderBottomColor = userColors[userColorIndex];
            document.body.appendChild(cursor);
            joinedUserSocketIds.push(socketId);

            let textElement = document.createElement("p");
            textElement.classList.add("text");
            textElement.textContent = myName;
            textElement.style.color = userColors[userColorIndex]
            cursor.appendChild(textElement);
            userColorIndex = userColorIndex + 1;
            if (userColorIndex === userColors.length) {
                userColorIndex = 0;
            }
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
                socket?.emit("cursorMove", { myName, clientX, clientY })
                return;
            }
            socket?.emit('drawingData', { myName, clientX, clientY, offsetX, offsetY, color })
        }
        if (!contextRef.current) return;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
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
