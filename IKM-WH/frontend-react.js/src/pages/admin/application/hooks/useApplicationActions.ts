import { useState } from 'react';
import { Application as ApplicationType } from '@shared/api/endpoints/applications.endpoints';

interface UseApplicationActionsProps {
    updateApplication: (id: string, data: any) => Promise<any>;
}

export const useApplicationActions = ({ updateApplication }: UseApplicationActionsProps) => {
    const [selectedApp, setSelectedApp] = useState<ApplicationType | null>(null);

    const handleStatusUpdate = async (applicationId: string, newStatus: 'approved' | 'rejected') => {
        try {
            await updateApplication(applicationId, { status: newStatus });
            alert(`Заявка ${newStatus === 'approved' ? 'одобрена' : 'отклонена'}`);
        } catch (error) {
            console.error('Error updating application:', error);
            alert('Ошибка обновления статуса заявки');
        }
    };

    const handleApproveSelected = () => {
        if (selectedApp) {
            handleStatusUpdate(selectedApp.id, 'approved');
            setSelectedApp(null);
        }
    };

    const handleRejectSelected = () => {
        if (selectedApp) {
            handleStatusUpdate(selectedApp.id, 'rejected');
            setSelectedApp(null);
        }
    };

    return {
        selectedApp,
        setSelectedApp,
        handleStatusUpdate,
        handleApproveSelected,
        handleRejectSelected
    };
};