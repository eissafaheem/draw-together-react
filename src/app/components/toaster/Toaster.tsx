import React from 'react'
import useToasterHook from './Toaster.hook'
import closeIcon from './../../../assets/close.svg'
import ToasterStyles from './Toaster.module.css'

export type ToasterProps = {
    setIsToasterVisible: React.Dispatch<React.SetStateAction<boolean>>,
    text: string
}

function Toaster(props: ToasterProps) {

    const { text, closeToaster } = useToasterHook(props);

    return (
        <div className={ToasterStyles['toaster-container']}>
            <span>
                {text}
            </span>
            <img src={closeIcon} alt="" onClick={closeToaster}/>
        </div>
    )
}

export default Toaster
