import '@shared/styles/animations.css';
import { AdminHeader } from "@shared/ui/adminPage";
import { useApplications } from '@shared/hooks/useApplications';
import { useApplicationFilters } from '../hooks/useApplicationFilters';
import { useApplicationStats } from '../hooks/useApplicationStats';
import { useApplicationActions } from '../hooks/useApplicationActions';
import { ApplicationLoadingState } from '../components/ApplicationLoadingState';
import { ApplicationErrorMessage } from '../components/ApplicationErrorMessage';
import { ExportButton } from '../components/ExportButton';
import { ApplicationContent } from '../components/ApplicationContent';

export const Application = () => {
    const { applications, loading, error, updateApplication } = useApplications();
    
    const {
        searchTerm,
        statusFilter,
        filteredApplications,
        setSearchTerm,
        setStatusFilter
    } = useApplicationFilters(applications);
    
    const stats = useApplicationStats(applications);
    
    const {
        selectedApp,
        setSelectedApp,
        handleStatusUpdate,
        handleApproveSelected,
        handleRejectSelected
    } = useApplicationActions({ updateApplication: updateApplication as any });

    if (loading) {
        return (
            <AdminHeader
                title="Заявки от групп"
                description="Загрузка данных..."
            >
                <ApplicationLoadingState />
            </AdminHeader>
        );
    }

    return (
        <AdminHeader
            title="Заявки от групп"
            description="Управление заявками на участие в проекте"
            actions={<ExportButton applications={filteredApplications} />}
        >
            {error && <ApplicationErrorMessage error={error} />}
            
            <ApplicationContent
                filteredApplications={filteredApplications}
                stats={stats}
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                selectedApp={selectedApp}
                onSearchChange={setSearchTerm}
                onStatusChange={setStatusFilter}
                onViewDetails={setSelectedApp}
                onStatusUpdate={handleStatusUpdate}
                onCloseModal={() => setSelectedApp(null)}
                onApproveSelected={handleApproveSelected}
                onRejectSelected={handleRejectSelected}
            />
        </AdminHeader>
    );
};