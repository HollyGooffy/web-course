import style from '../Fan.module.css';

interface FanEmptyStateProps {
    message: string;
}

export const FanEmptyState = ({ message }: FanEmptyStateProps) => {
    return <div className={style.loading}>{message}</div>;
};