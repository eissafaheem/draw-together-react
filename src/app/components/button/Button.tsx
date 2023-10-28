import React from 'react'
import ButtonStyles from './Button.module.css'

type ButtonProps = {
    type: "primary" | "secondary",
    text: string,
    onClick: any
}

function Button(props: ButtonProps) {
    const {type, text, onClick} = props;
  return (
    <button className={ButtonStyles[`${type}-btn`]} onClick={onClick}>
        {text}
    </button>
  )
}

export default Button
