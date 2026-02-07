import {CSSProperties, ReactNode} from "react";

export interface GridProps {
    children: ReactNode;
    columns?: number | 'auto-fill' | 'auto-fit';
    minWidth?: string;
    gap?: string;
    marginBottom?: string;
    className?: string;
    style?: CSSProperties;
}