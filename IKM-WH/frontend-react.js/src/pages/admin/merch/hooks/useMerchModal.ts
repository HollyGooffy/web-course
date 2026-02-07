import { useState } from 'react';
import { MerchItem } from '@shared/api/endpoints/merch.endpoints';

export const useMerchModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);

    const handleOpenCreateModal = () => {
        setModalMode('create');
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (item: MerchItem) => {
        setModalMode('edit');
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return {
        isModalOpen,
        modalMode,
        selectedItem,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal
    };
};