import React from 'react'
import InputStyles from './input.module.css'

type InputProps = {
    placeholder: string,
    value?: string
}

function Input(props: InputProps) {
    const { placeholder, value } = props;
    return (
        <input type="text" placeholder={placeholder} value={value} className={InputStyles['input']} />
    )
}

export default Input
