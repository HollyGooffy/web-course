import { useState, useMemo } from 'react';
import { Application as ApplicationType } from '@shared/api/endpoints/applications.endpoints';

export const useApplicationFilters = (applications: ApplicationType[]) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const filteredApplications = useMemo(() => {
        return applications.filter(app => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = !searchTerm || 
                app.groupName.toLowerCase().includes(searchLower) ||
                (app.contactTelegram && app.contactTelegram.toLowerCase().includes(searchLower)) ||
                (app.contactPhone && app.contactPhone.includes(searchTerm));
            const matchesStatus = !statusFilter || app.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [applications, searchTerm, statusFilter]);

    return {
        searchTerm,
        statusFilter,
        filteredApplications,
        setSearchTerm,
        setStatusFilter
    };
};