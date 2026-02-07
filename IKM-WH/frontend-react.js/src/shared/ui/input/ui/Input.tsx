import { forwardRef } from 'react';
import style from './Input.module.css';
import { InputProps } from "@shared/ui/input/ui/input-props.ts";

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type = 'text', id, placeholder, ...rest }, ref) => {
        return (
            <div>
                <input 
                    type={type} 
                    id={id} 
                    className={style.Input} 
                    placeholder={placeholder}
                    ref={ref}
                    {...rest}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';
