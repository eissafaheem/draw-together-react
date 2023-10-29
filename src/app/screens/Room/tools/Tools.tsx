import React from 'react'
import ToolsStyles from './Tools.module.css'
import brushIcon from './../../../../assets/brush.svg'
import eraserIcon from './../../../../assets/eraser.svg'
import deleteIcon from './../../../../assets/delete.svg'
import downloadIcon from './../../../../assets/download.svg'

type ToolsProps = {
    setValue: React.Dispatch<React.SetStateAction<string>>
}

function Tools(props: ToolsProps) {

    let colors = ["red", "yellow", "green", "purple", "white"]

    const { setValue } = props;
    return (
        <div className={ToolsStyles['tools-container']}>
            <img src={brushIcon} alt="" onClick={()=>setValue("white")}/>
            {
                colors.map(color =>
                    <div
                    style={{ backgroundColor: color }} className={ToolsStyles["color"]}
                    onClick={() => setValue(color)}>
                    </div>
                )
            }
            <img src={eraserIcon} alt="" onClick={()=>setValue("black")}/>
            <img src={deleteIcon} alt="" onClick={()=>setValue("white")}/>
            <img src={downloadIcon} alt="" onClick={()=>setValue("white")}/>
        </div>
    )
}

export default Tools
