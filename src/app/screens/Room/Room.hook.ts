import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSocketContext } from '../../context/SocketProvider';

const useRoomHook = () => {
    const { roomId } = useParams();
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState("white")
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
            // console.log(roomId)
        })
        socket?.on("startDrawing", (data) => {
            // console.log("start", data)
            const { offsetX, offsetY, color } = data;
            setColor(color)
            startDrawing(offsetX, offsetY, false);
        })
        socket?.on("drawingData", (data) => {
            // console.log("draw", data)
            const { offsetX, offsetY, color } = data;
            draw(offsetX, offsetY, false)

        })
        socket?.on("finishDrawing", () => {
            // console.log("finish")
            finishDrawing(false);
        })
        socket?.on("clearCanvas", () => {
            console.log("clear")
        })
        socket?.on("cursorMove", (data) => {
            console.log(data)
            const { socketId, offsetX, offsetY } = data;
            // cursorMove(socketId, offsetX, offsetY)
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

    function cursorMove(socketId: string, offsetX: number, offsetY: number) {
        let cursor = document.getElementById(socketId);
        if (!cursor) {
            cursor = document.createElement("div");
            cursor.id = socketId;
            cursor.style.width = "10rem";
            cursor.style.height = "10rem";
            cursor.style.backgroundColor = "white";
            cursor.style.position = "absolute";
            document.body.appendChild(cursor);
        }
        cursor.style.left = offsetX.toString();
        cursor.style.top = offsetY.toString();
        cursor.style.zIndex = "10";
        console.log(cursor)
    }

    function addContext() {
        const canvas = canvasRef.current
        if (!canvas) return;
        const context = canvas.getContext("2d")
        if (!context) return;
        context.strokeStyle = color;
    }

    const startDrawing = (offsetX: number, offsetY: number, isMyDrawing: boolean = true) => {
        if (!contextRef.current) return;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        console.log("start fine")
        setIsDrawing(true);
        if (isMyDrawing) {
            socket?.emit('startDrawing', { offsetX, offsetY, color });
        }
    };

    const finishDrawing = (isMyDrawing: boolean = true) => {
        if (!contextRef.current) return;
        // console.log("finish fine")
        contextRef.current.closePath();
        setIsDrawing(false);
        if (isMyDrawing) {
            socket?.emit('finishDrawing');
        }
    };

    const draw = (offsetX: number, offsetY: number, isMyDrawing: boolean = true) => {
        if (isMyDrawing) {
            console.log("my cursor", offsetX, offsetY)
            if (!isDrawing) {
                // socket?.emit("cursorMove", {offsetX,offsetY})

                cursorMove("sdf", offsetX, offsetY)
                return;
            }
        }
        if (!contextRef.current) return;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        if (isMyDrawing) {
            socket?.emit('drawingData', { offsetX, offsetY, color })
        }
    };

    return {
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
        setColor,
    };
}

export default useRoomHook;
