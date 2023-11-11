import { useEffect } from "react";
import { useSocketContext } from "../../../context/SocketProvider";
import { ToolsProps } from "./Tools";
import { toolsColors } from "../../../utils/colors";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../App.routing";

const useToolsHook = (props: ToolsProps) => {
    let colors = toolsColors;
    const { setValue, canvasRef } = props;
    const socket = useSocketContext();
    const navigate = useNavigate();

    useEffect(() => {
        socket?.on('clearCanvas', () => {
            clearCanvas(false);
        })
    }, [])

    const clearCanvas = (isMyAction: boolean = true) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d")
        if (!context) return;
        context.fillStyle = "black"
        context.fillRect(0, 0, canvas.width, canvas.height)
        if (isMyAction) {
            socket?.emit('clearCanvas');
        }
    }

    function downloadCanvas() {
        var url = canvasRef?.current?.toDataURL("image/png");
        var link = document.createElement('a');
        link.download = 'drawTogether.png';
        link.href = url || "";
        link.click();
    }

    function exitRoom() {
        navigate(ROUTES.lobby);
    }

    return {
        colors,
        clearCanvas,
        setValue,
        downloadCanvas,
        exitRoom
    };
}

export default useToolsHook;