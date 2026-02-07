import '@shared/styles/animations.css';
import { AdminHeader } from "@shared/ui/adminPage";
import { LoadingState } from '@shared/ui/loading-state';
import { useGroups } from '@shared/hooks/useGroups';
import { GroupModal } from '@features/group-management';
import { useGroupFilters } from '../hooks/useGroupFilters';
import { useGroupModal } from '../hooks/useGroupModal';
import { useGroupActions } from '../hooks/useGroupActions';
import { CreateGroupButton } from '../components/CreateGroupButton';
import { GroupsContent } from '../components/GroupsContent';

export const Groups = () => {
    const { groups, loading, error, createGroup, updateGroup, deleteGroup } = useGroups();
    
    const {
        searchTerm,
        selectedGenre,
        filteredGroups,
        genres,
        setSearchTerm,
        setSelectedGenre
    } = useGroupFilters(groups);
    
    const {
        isModalOpen,
        modalMode,
        selectedGroup,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal
    } = useGroupModal();
    
    const { handleSubmit, handleDelete } = useGroupActions({
        createGroup,
        updateGroup,
        deleteGroup
    });

    const onSubmit = async (data: any, imageFile?: File) => {
        await handleSubmit(data, imageFile, modalMode, selectedGroup);
    };

    if (loading) {
        return (
            <AdminHeader
                title="Список групп"
                description="Загрузка данных..."
            >
                <LoadingState message="Загрузка групп..." />
            </AdminHeader>
        );
    }

    return (
        <>
            <AdminHeader
                title="Список групп"
                description="Управление музыкальными коллективами"
                actions={<CreateGroupButton onClick={handleOpenCreateModal} />}
            >
                <GroupsContent
                    error={error || undefined}
                    filteredGroups={filteredGroups}
                    searchTerm={searchTerm}
                    selectedGenre={selectedGenre}
                    genres={genres}
                    onSearchChange={setSearchTerm}
                    onGenreChange={setSelectedGenre}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDelete}
                />
            </AdminHeader>

            <GroupModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={onSubmit}
                group={selectedGroup || undefined}
                mode={modalMode}
            />
        </>
    );
};