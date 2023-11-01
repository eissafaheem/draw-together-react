import { useSocketContext } from "../../../context/SocketProvider";
import { ToolsProps } from "./Tools";

const useToolsHook = (props: ToolsProps) =>{
    let colors = ["red", "yellow", "green", "purple", "white"]
    const { setValue, canvasRef } = props;
    const socket  = useSocketContext();
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const context = canvas.getContext("2d")
        if(!context) return;
        context.fillStyle = "black"
        context.fillRect(0, 0, canvas.width, canvas.height)
        socket?.emit('clearCanvas');
        console.log("object")
    }

    return {
        colors,
        clearCanvas,
        setValue
    };
}

export default useToolsHook;