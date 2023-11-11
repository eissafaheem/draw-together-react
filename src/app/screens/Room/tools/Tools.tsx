import React from 'react'
import ToolsStyles from './Tools.module.css'
import brushIcon from './../../../../assets/brush.svg'
import eraserIcon from './../../../../assets/eraser.svg'
import deleteIcon from './../../../../assets/delete.svg'
import downloadIcon from './../../../../assets/download.svg'
import useToolsHook from './Tools.hook'

export type ToolsProps = {
    setValue: React.Dispatch<React.SetStateAction<string>>,
    canvasRef: React.RefObject<HTMLCanvasElement>
}

function Tools(props: ToolsProps) {
    const {
        colors,
        clearCanvas,
        setValue,
        downloadCanvas
    } = useToolsHook(props)

    return (
        <div className={ToolsStyles['tools-container']}>
            <img src={brushIcon} alt="" onClick={() => setValue("white")} />
            {
                colors.map(color =>
                    <div
                        style={{ backgroundColor: color }} className={ToolsStyles["color"]}
                        onClick={() => setValue(color)}>
                    </div>
                )
            }
            <img src={eraserIcon} alt="" onClick={() => setValue("black")} />
            <img src={deleteIcon} alt="" onClick={() => clearCanvas()} />
            <img src={downloadIcon} alt="" onClick={downloadCanvas} />
        </div>
    )
}

export default Tools
