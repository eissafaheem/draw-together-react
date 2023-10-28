import React from 'react'
import ButtonStyles from './Button.module.css'

type ButtonProps = {
    type: "primary" | "secondary",
    text: string,
}

function Button(props: ButtonProps) {
    const {type, text} = props;
  return (
    <button className={ButtonStyles[`${type}-btn`]}>
        {text}
    </button>
  )
}

export default Button
