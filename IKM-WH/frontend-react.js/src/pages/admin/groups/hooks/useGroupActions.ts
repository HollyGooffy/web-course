import { Group } from '@shared/api/endpoints/groups.endpoints';

interface UseGroupActionsProps {
    createGroup: (data: any, imageFile?: File) => Promise<any>;
    updateGroup: (id: string, data: any, imageFile?: File) => Promise<any>;
    deleteGroup: (id: string) => Promise<any>;
}

export const useGroupActions = ({ createGroup, updateGroup, deleteGroup }: UseGroupActionsProps) => {
    const handleSubmit = async (
        data: any, 
        imageFile?: File, 
        mode: 'create' | 'edit' = 'create',
        selectedGroup?: Group | null
    ) => {
        if (mode === 'create') {
            await createGroup(data, imageFile);
        } else if (selectedGroup) {
            await updateGroup(selectedGroup.id, data, imageFile);
        }
    };

    const handleDelete = async (group: Group) => {
        if (window.confirm(`Вы уверены, что хотите удалить группу "${group.name}"?`)) {
            try {
                await deleteGroup(group.id);
            } catch (error: any) {
                console.error('Error deleting group:', error);
                const errorMessage = error.response?.data?.error || error.message || 'Ошибка при удалении группы';
                alert(`Ошибка при удалении группы: ${errorMessage}`);
            }
        }
    };

    return {
        handleSubmit,
        handleDelete
    };
};