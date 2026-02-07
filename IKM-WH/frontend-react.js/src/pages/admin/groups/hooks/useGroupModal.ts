import { useState } from 'react';
import { Group } from '@shared/api/endpoints/groups.endpoints';

export const useGroupModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const handleOpenCreateModal = () => {
        setModalMode('create');
        setSelectedGroup(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (group: Group) => {
        setModalMode('edit');
        setSelectedGroup(group);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGroup(null);
    };

    return {
        isModalOpen,
        modalMode,
        selectedGroup,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseModal
    };
};