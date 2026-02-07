import {ButtonHTMLAttributes} from "react";

export interface AdminBtnProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?: React.ReactNode;
    className?: string;
    variant?: 'outline' | "secondary" | 'primary' | 'accent' | 'black-outline' | 'destructive' | 'positive' | 'blue';
    disabled?: boolean;
}