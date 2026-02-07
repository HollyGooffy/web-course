import { Application as ApplicationType } from '@shared/api/endpoints/applications.endpoints';
import { ApplicationFilters } from '@features/application-filters';
import { ApplicationStats } from '@features/application-stats';
import { ApplicationTable } from '@features/application-table';
import { ApplicationDetailsModal } from '@features/application-details';
import style from '../ui/Application.module.css';

interface ApplicationContentProps {
    filteredApplications: ApplicationType[];
    stats: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    };
    searchTerm: string;
    statusFilter: string;
    selectedApp: ApplicationType | null;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onViewDetails: (app: ApplicationType) => void;
    onStatusUpdate: (id: string, status: 'approved' | 'rejected') => void;
    onCloseModal: () => void;
    onApproveSelected: () => void;
    onRejectSelected: () => void;
}

export const ApplicationContent = ({
    filteredApplications,
    stats,
    searchTerm,
    statusFilter,
    selectedApp,
    onSearchChange,
    onStatusChange,
    onViewDetails,
    onStatusUpdate,
    onCloseModal,
    onApproveSelected,
    onRejectSelected
}: ApplicationContentProps) => {
    return (
        <div className={`${style.applicationContent} fadeIn`}>
            <div className="slideUp" style={{ animationDelay: '0.2s' }}>
                <ApplicationFilters
                    searchTerm={searchTerm}
                    statusFilter={statusFilter}
                    onSearchChange={onSearchChange}
                    onStatusChange={onStatusChange}
                />
            </div>

            <div className="slideUp" style={{ animationDelay: '0.3s' }}>
                <ApplicationStats
                    total={stats.total}
                    pending={stats.pending}
                    approved={stats.approved}
                    rejected={stats.rejected}
                />
            </div>

            <div className="slideUp" style={{ animationDelay: '0.4s' }}>
                <ApplicationTable
                    applications={filteredApplications}
                    onViewDetails={onViewDetails}
                    onStatusUpdate={onStatusUpdate}
                />
            </div>

            {selectedApp && (
                <ApplicationDetailsModal
                    application={selectedApp}
                    onClose={onCloseModal}
                    onApprove={selectedApp.status === 'pending' ? onApproveSelected : undefined}
                    onReject={selectedApp.status === 'pending' ? onRejectSelected : undefined}
                />
            )}
        </div>
    );
};