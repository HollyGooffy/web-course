import React from 'react';
import styles from './Button.module.css';
import {ButtonProps} from "@/shared/ui/button/ui/button-props";

export const Button: React.FC<ButtonProps> = ({
                                                  variant = 'primary',
                                                  href,
                                                  children,
                                                  type = 'button',
                                                  disabled = false,
                                                  onClick
                                              }) => {
    const className = `${styles.btn} ${styles[`btn--${variant}`]}`;

    if (href) {
        return (
            <a href={href} className={className} type={type}>
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={className}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};