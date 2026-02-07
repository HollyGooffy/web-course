import '@shared/styles/animations.css';
import { AdminHeader } from "@shared/ui/adminPage";
import { LoadingState } from '@shared/ui/loading-state';
import { useGroups } from '@shared/hooks/useGroups';
import { 
    useParticipantCardsFilters, 
    useGroupsWithCards, 
    useParticipantCardsActions 
} from '../hooks';
import { ParticipantCardsContent } from '../components';

export const ParticipantCardsManager: React.FC = () => {
    const { groups, loading, error } = useGroups();
    
    const { groupsWithCards, handleCardsChange } = useGroupsWithCards(groups);
    
    const { searchTerm, filteredGroups, setSearchTerm } = useParticipantCardsFilters(groupsWithCards);
    
    const {
        handleSaveCards,
        handleDeleteAllCards,
        getTotalSize,
        formatFileSize
    } = useParticipantCardsActions({ groupsWithCards, onCardsChange: handleCardsChange });

    if (loading) {
        return (
            <AdminHeader
                title="Управление карточками участников"
                description="Загрузка данных..."
            >
                <LoadingState message="Загрузка групп..." />
            </AdminHeader>
        );
    }

    return (
        <AdminHeader
            title="Управление карточками участников"
            description="Загружайте и управляйте карточками участников для каждой группы"
        >
            <ParticipantCardsContent
                error={error || undefined}
                filteredGroups={filteredGroups}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onCardsChange={handleCardsChange}
                onSaveCards={handleSaveCards}
                onDeleteAllCards={handleDeleteAllCards}
                getTotalSize={getTotalSize}
                formatFileSize={formatFileSize}
            />
        </AdminHeader>
    );
};