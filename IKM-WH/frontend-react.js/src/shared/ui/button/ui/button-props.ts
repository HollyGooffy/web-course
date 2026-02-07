import React from "react";

export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    href?: string;
    children: React.ReactNode;
    type?: 'button' | 'submit';
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}