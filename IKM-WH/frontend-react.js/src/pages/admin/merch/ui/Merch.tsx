import '@shared/styles/animations.css';
import { AdminHeader } from "@shared/ui/adminPage";
import { LoadingState } from '@shared/ui/loading-state';
import { useMerch } from '@shared/hooks/useMerch';
import { MerchModal } from '@features/merch-management';
import { useMerchFilters } from '../hooks/useMerchFilters';
import { useMerchModal } from '../hooks/useMerchModal';
import { useMerchActions } from '../hooks/useMerchActions';
import { CreateMerchButton } from '../components/CreateMerchButton';
import { MerchContent } from '../components/MerchContent';

export const Merch = () => {
    const { items, loading, error, createItem, updateItem, deleteItem } = useMerch();
    
    const {
        searchTerm,
        selectedCategory,
        filteredItems,
        categories,
        setSearchTerm,
        setSelectedCategory
    } = useMerchFilters(items);
    
    const {
        isModalOpen,
        modalMode,
        selectedItem,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal
    } = useMerchModal();
    
    const { handleSubmit, handleDelete } = useMerchActions({
        createItem,
        updateItem,
        deleteItem
    });

    const onSubmit = async (data: any, imageFile?: File) => {
        await handleSubmit(data, imageFile, modalMode, selectedItem);
    };

    if (loading) {
        return (
            <AdminHeader
                title="Мерч"
                description="Загрузка данных..."
            >
                <LoadingState message="Загрузка товаров..." />
            </AdminHeader>
        );
    }

    return (
        <>
            <AdminHeader
                title="Мерч"
                description="Управление товарами фестиваля"
                actions={<CreateMerchButton onClick={handleOpenCreateModal} />}
            >
                <MerchContent
                    error={error || undefined}
                    filteredItems={filteredItems}
                    searchTerm={searchTerm}
                    selectedCategory={selectedCategory}
                    categories={categories as string[]}
                    onSearchChange={setSearchTerm}
                    onCategoryChange={setSelectedCategory}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDelete}
                />
            </AdminHeader>

            <MerchModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={onSubmit}
                item={selectedItem || undefined}
                mode={modalMode}
            />
        </>
    );
};