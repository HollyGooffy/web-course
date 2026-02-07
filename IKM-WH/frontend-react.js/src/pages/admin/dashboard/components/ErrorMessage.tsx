interface ErrorMessageProps {
    error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
    return (
        <div className="slideRight" style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px 16px',
            borderRadius: '4px',
            marginBottom: '24px',
            border: '1px solid #f5c6cb'
        }}>
            Ошибка загрузки статистики: {error}
        </div>
    );
};