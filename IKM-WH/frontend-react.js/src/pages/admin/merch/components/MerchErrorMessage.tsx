interface MerchErrorMessageProps {
    error: string;
}

export const MerchErrorMessage = ({ error }: MerchErrorMessageProps) => {
    return (
        <div className="slideUp" style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px 16px',
            borderRadius: '4px',
            marginBottom: '24px',
            border: '1px solid #f5c6cb',
            animationDelay: '0.1s'
        }}>
            Ошибка загрузки товаров: {error}
        </div>
    );
};