import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSocketContext } from '../../context/SocketProvider';

const useRoomHook = () => {
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState("white")
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const socket = useSocketContext();
    useEffect(()=>{
        prepareCanvas();
    },[])

    useEffect(()=>{
        addContext();
    },[color])

    const prepareCanvas = () => {
        const canvas = canvasRef.current
        if(!canvas) return;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        const context = canvas.getContext("2d")
        if(!context) return;
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineWidth = 5;
        contextRef.current = context;
    };
    
    function addContext(){
        const canvas = canvasRef.current
        if(!canvas) return;
        const context = canvas.getContext("2d")
        if(!context) return;
        context.strokeStyle = color;
    }

    const startDrawing = ({ nativeEvent }: any) => {
        const { offsetX, offsetY } = nativeEvent;
        if(!contextRef.current) return;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };
    
    const finishDrawing = () => {
        if(!contextRef.current) return;
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }:any ) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        if(!contextRef.current) return;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const context = canvas.getContext("2d")
        if(!context) return;
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

    return {
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        setColor
    };
}

export default useRoomHook;