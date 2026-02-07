import React from 'react';
import {AdminSelectProps} from "@shared/ui/adminPage/AdminSelect/ui/adminSelect-props.ts";
import style from './AdminSelect.module.css'

export const AdminSelect = React.forwardRef<HTMLSelectElement, AdminSelectProps>(({
    children,
    className,
    ...rest
}, ref) => {
    return (
        <select 
            ref={ref}
            className={`${style.select} ${className || ''}`}
            {...rest}
        >
            {children}
        </select>
    )
})

AdminSelect.displayName = 'AdminSelect';