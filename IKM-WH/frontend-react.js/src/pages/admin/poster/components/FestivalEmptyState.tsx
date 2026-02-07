import { Calendar, Plus } from 'lucide-react';
import { AdminBtn } from "@shared/ui/adminPage";
import style from '../ui/Poster.module.css';

interface FestivalEmptyStateProps {
    onCreate: () => void;
}

export const FestivalEmptyState = ({ onCreate }: FestivalEmptyStateProps) => {
    return (
        <div className={style.emptyState}>
            <div className={style.emptyStateIcon}>
                <Calendar size={64} />
            </div>
            <div className={style.emptyStateContent}>
                <h3>Нет фестивалей</h3>
                <p>Создайте первый фестиваль для афиши</p>
                <AdminBtn 
                    variant="primary" 
                    onClick={onCreate}
                    className={style.emptyStateButton}
                >
                    <Plus size={18} />
                    Добавить фестиваль
                </AdminBtn>
            </div>
        </div>
    );
};