interface GroupsEmptyStateProps {
    message?: string;
}

export const GroupsEmptyState = ({ message = "Пока нет групп для отображения" }: GroupsEmptyStateProps) => {
    return (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>{message}</p>
        </div>
    );
};