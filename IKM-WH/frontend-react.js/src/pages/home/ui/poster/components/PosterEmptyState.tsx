import { Calendar } from 'lucide-react';
import style from '../Poster.module.css';

interface PosterEmptyStateProps {
    message: string;
}

export const PosterEmptyState = ({ message }: PosterEmptyStateProps) => {
    return (
        <div className={style.emptyState}>
            <Calendar size={48} />
            <p>{message}</p>
        </div>
    );
};