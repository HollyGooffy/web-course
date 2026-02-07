import React from 'react';
import {AdminInputProps} from "@shared/ui/adminPage/AdminInput/ui/adminInput-props.ts";
import style from './AdminInput.module.css'

export const AdminInput = React.forwardRef<HTMLInputElement, AdminInputProps>(({
    type = 'text', 
    className,
    ...rest
}, ref) => {
    return (
        <input 
            ref={ref}
            type={type} 
            className={`${style.input} ${className || ''}`}
            {...rest}
        />
    )
})

AdminInput.displayName = 'AdminInput';

