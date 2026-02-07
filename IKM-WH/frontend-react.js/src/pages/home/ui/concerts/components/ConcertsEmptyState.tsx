import { Calendar } from 'lucide-react';
import style from '../Concerts.module.css';

export const ConcertsEmptyState = () => {
    return (
        <div className={style.emptyState}>
            <Calendar size={64} />
            <p>Концерты пока не запланированы. Следите за обновлениями!</p>
        </div>
    );
};
