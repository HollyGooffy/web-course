import { Plus } from 'lucide-react';
import style from '../Groups.module.css';

interface LoadMoreButtonProps {
    onClick: () => void;
    isLoading: boolean;
    nextLoadCount: number;
}

export const LoadMoreButton = ({ onClick, isLoading, nextLoadCount }: LoadMoreButtonProps) => {
    return (
        <div className={style.loadMoreContainer}>
            <button 
                className={`${style.loadMoreButton} ${isLoading ? style.loading : ''}`}
                onClick={onClick}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <div className={style.spinner}></div>
                        Загрузка...
                    </>
                ) : (
                    <>
                        <Plus size={20} />
                        Показать еще ({nextLoadCount})
                    </>
                )}
            </button>
        </div>
    );
};