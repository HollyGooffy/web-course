import React from 'react';

export interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: 'text' | 'number' | 'boolean' | 'date' | 'time' | 'email' | 'tel' | 'url';
}