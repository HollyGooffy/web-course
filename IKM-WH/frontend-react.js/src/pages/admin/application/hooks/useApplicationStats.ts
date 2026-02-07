import { useMemo } from 'react';
import { Application as ApplicationType } from '@shared/api/endpoints/applications.endpoints';

export const useApplicationStats = (applications: ApplicationType[]) => {
    const stats = useMemo(() => ({
        total: applications.length,
        pending: applications.filter(app => app.status === 'pending').length,
        approved: applications.filter(app => app.status === 'approved').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
    }), [applications]);

    return stats;
};