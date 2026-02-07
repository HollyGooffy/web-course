import { ReactNode } from 'react';
import style from '../ui/Dashboard.module.css';

interface EmptyStateProps {
    icon: ReactNode;
    message: string;
}

export const EmptyState = ({ icon, message }: EmptyStateProps) => {
    return (
        <div className={style.emptyState}>
            {icon}
            <p>{message}</p>
        </div>
    );
};