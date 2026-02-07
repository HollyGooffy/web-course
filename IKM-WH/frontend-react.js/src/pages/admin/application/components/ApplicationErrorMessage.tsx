import style from '../ui/Application.module.css';

interface ApplicationErrorMessageProps {
    error: string;
}

export const ApplicationErrorMessage = ({ error }: ApplicationErrorMessageProps) => {
    return (
        <div className={`${style.errorMessage} slideUp`} style={{ animationDelay: '0.1s' }}>
            Ошибка загрузки заявок: {error}
        </div>
    );
};