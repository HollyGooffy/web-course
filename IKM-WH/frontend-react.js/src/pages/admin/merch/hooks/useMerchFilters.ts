import { useState, useMemo } from 'react';
import { MerchItem } from '@shared/api/endpoints/merch.endpoints';

export const useMerchFilters = (items: MerchItem[]) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
            const matchesCategory = !selectedCategory || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [items, searchTerm, selectedCategory]);

    const categories = useMemo(() => {
        return [...new Set(items.map(item => item.category).filter((category): category is string => Boolean(category)))];
    }, [items]);

    return {
        searchTerm,
        selectedCategory,
        filteredItems,
        categories,
        setSearchTerm,
        setSelectedCategory
    };
};