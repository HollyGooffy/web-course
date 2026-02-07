interface MerchEmptyStateProps {
    message?: string;
}

export const MerchEmptyState = ({ message = "Мерча пока нет. Следите за обновлениями!" }: MerchEmptyStateProps) => {
    return (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>{message}</p>
        </div>
    );
};