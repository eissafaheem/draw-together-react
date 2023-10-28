import React from 'react'
import InputStyles from './input.module.css'

type InputProps = {
    placeholder: string,
    value?: string,
    onChange: any
}

function Input(props: InputProps) {
    const { placeholder, value, onChange } = props;
    return (
        <input type="text" placeholder={placeholder} value={value} className={InputStyles['input']} onChange={onChange}/>
    )
}

export default Input
