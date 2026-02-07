import { useState, useEffect } from 'react';
import { useGroups } from '@shared/hooks/useGroups';
import { transformGroupData } from '../lib/transformGroupData';
import { GroupDisplayItem } from '../model/types';

export const useGroupsData = () => {
    const { groups: apiGroups, loading, error } = useGroups();
    const [displayGroups, setDisplayGroups] = useState<GroupDisplayItem[]>([]);

    useEffect(() => {
        const transformedGroups = transformGroupData(apiGroups);
        setDisplayGroups(transformedGroups);
    }, [apiGroups]);

    return {
        displayGroups,
        loading,
        error
    };
};