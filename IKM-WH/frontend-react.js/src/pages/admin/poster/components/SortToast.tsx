import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import style from '../ui/Poster.module.css';

interface SortToastProps {
    show: boolean;
    sortOrder: 'desc' | 'asc';
    sortOrderText: string;
}

export const SortToast = ({ show, sortOrder, sortOrderText }: SortToastProps) => {
    if (!show) return null;

    const getSortIcon = () => {
        return sortOrder === 'desc' ? ArrowDown : ArrowUp;
    };

    return (
        <div className={style.sortToast}>
            <div className={style.toastContent}>
                {React.createElement(getSortIcon(), { size: 16 })}
                <span>Сортировка изменена: {sortOrderText}</span>
            </div>
        </div>
    );
};