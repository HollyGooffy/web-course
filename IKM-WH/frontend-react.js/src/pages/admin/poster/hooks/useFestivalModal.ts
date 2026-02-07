import { useState } from 'react';

export const useFestivalModal = () => {
    const [selectedFestival, setSelectedFestival] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreate = () => {
        setSelectedFestival(null);
        setIsModalOpen(true);
    };

    const handleEdit = (festival: any) => {
        setSelectedFestival(festival);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedFestival(null);
    };

    return {
        selectedFestival,
        isModalOpen,
        handleCreate,
        handleEdit,
        handleClose
    };
};