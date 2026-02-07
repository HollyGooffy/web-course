import style from '../ui/Poster.module.css';

interface PosterErrorMessageProps {
    error: string;
}

export const PosterErrorMessage = ({ error }: PosterErrorMessageProps) => {
    return (
        <div className={style.errorMessage}>
            Ошибка загрузки фестивалей: {error}
        </div>
    );
};