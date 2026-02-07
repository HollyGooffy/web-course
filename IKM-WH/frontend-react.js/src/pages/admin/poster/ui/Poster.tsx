import { AdminHeader } from "@shared/ui/adminPage";
import { LoadingState } from '@shared/ui/loading-state';
import { useAdminFestivals } from '@shared/hooks/useAdminFestivals';
import { FestivalModal } from '@features/festival-management/ui/FestivalModal';
import { useFestivalSort } from '../hooks/useFestivalSort';
import { useFestivalModal } from '../hooks/useFestivalModal';
import { useFestivalActions } from '../hooks/useFestivalActions';
import { useSortToast } from '../hooks/useSortToast';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { PosterContent } from '../components/PosterContent';
import { SortToast } from '../components/SortToast';

export const Poster = () => {
    const { 
        festivals, 
        loading, 
        error,
        deleteFestival,
        refetch
    } = useAdminFestivals();
    
    const { sortOrder, sortedFestivals, toggleSortOrder, getSortOrderText } = useFestivalSort(festivals);
    const { selectedFestival, isModalOpen, handleCreate, handleEdit, handleClose } = useFestivalModal();
    const { handleDelete, handleRefresh } = useFestivalActions({ deleteFestival, refetch });
    const { showSortToast, showToast } = useSortToast();

    const handleToggleSort = () => {
        toggleSortOrder();
        showToast();
    };

    useKeyboardShortcuts({ onToggleSort: handleToggleSort });

    if (loading) {
        return (
            <AdminHeader
                title="Афиша фестивалей"
                description="Управление фестивалями и концертами"
            >
                <LoadingState message="Загрузка фестивалей..." />
            </AdminHeader>
        );
    }

    return (
        <AdminHeader
            title="Афиша фестивалей"
            description="Управление фестивалями и концертами"
        >
            <PosterContent
                error={error || undefined}
                festivals={sortedFestivals}
                onRefresh={handleRefresh}
                onToggleSort={handleToggleSort}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {isModalOpen && (
                <FestivalModal
                    isOpen={isModalOpen}
                    festival={selectedFestival}
                    onClose={handleClose}
                />
            )}

            <SortToast
                show={showSortToast}
                sortOrder={sortOrder}
                sortOrderText={getSortOrderText()}
            />
        </AdminHeader>
    );
};