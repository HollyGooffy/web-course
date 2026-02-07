import { MerchItem, CreateMerchData } from '@shared/api/endpoints/merch.endpoints';

interface UseMerchActionsProps {
    createItem: (data: any, imageFile?: File) => Promise<any>;
    updateItem: (id: string, data: any, imageFile?: File) => Promise<any>;
    deleteItem: (id: string) => Promise<any>;
}

export const useMerchActions = ({ createItem, updateItem, deleteItem }: UseMerchActionsProps) => {
    const handleSubmit = async (
        data: CreateMerchData, 
        imageFile?: File, 
        mode: 'create' | 'edit' = 'create',
        selectedItem?: MerchItem | null
    ) => {
        if (mode === 'create') {
            await createItem(data, imageFile);
        } else if (selectedItem) {
            await updateItem(selectedItem.id, data, imageFile);
        }
    };

    const handleDelete = async (item: MerchItem) => {
        if (window.confirm(`Вы уверены, что хотите удалить товар "${item.title}"?`)) {
            try {
                await deleteItem(item.id);
            } catch (error: any) {
                console.error('Error deleting item:', error);
                const errorMessage = error.response?.data?.error || error.message || 'Ошибка при удалении товара';
                alert(`Ошибка при удалении товара: ${errorMessage}`);
            }
        }
    };

    return {
        handleSubmit,
        handleDelete
    };
};