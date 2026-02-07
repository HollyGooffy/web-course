import { useState, useMemo } from 'react';
import { Group } from '@shared/api/endpoints/groups.endpoints';

export const useGroupFilters = (groups: Group[]) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    const filteredGroups = useMemo(() => {
        return groups.filter(group => {
            const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = !selectedGenre || group.genre === selectedGenre;
            return matchesSearch && matchesGenre;
        });
    }, [groups, searchTerm, selectedGenre]);

    const genres = useMemo(() => {
        return [...new Set(groups.map(group => group.genre))];
    }, [groups]);

    return {
        searchTerm,
        selectedGenre,
        filteredGroups,
        genres,
        setSearchTerm,
        setSelectedGenre
    };
};