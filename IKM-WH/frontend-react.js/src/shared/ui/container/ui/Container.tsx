import React from 'react';
import styles from './Container.module.css';
import {ContainerProps} from "./Container-props.ts";

export const Container: React.FC<ContainerProps> = ({
                                                        children,
                                                        className = ''
                                                    }) => {
    return (
        <div className={`${styles.container} ${className}`}>
            {children}
        </div>
    );
};