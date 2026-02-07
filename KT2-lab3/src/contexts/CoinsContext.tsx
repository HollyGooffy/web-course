import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Coin } from '@/types/coins.types';
import { getCoins, getTotalCoins } from '@/lib/api/api';

interface CoinsContextType {
    coins: Coin[];
    loading: boolean;
    error: string | null;
    page: number;
    perPage: number;
    total: number;
    searchTerm: string;
    sortBy: 'name' | 'price' | 'market_cap' | 'volume' | 'price_change_24h';
    sortAsc: boolean;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    setSearchTerm: (term: string) => void;
    setSortBy: (sortBy: 'name' | 'price' | 'market_cap' | 'volume' | 'price_change_24h') => void;
    toggleSortAsc: () => void;
    filteredSortedCoins: Coin[];
}

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(50);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'price' | 'market_cap' | 'volume' | 'price_change_24h'>('market_cap');
    const [sortAsc, setSortAsc] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [coinsData, totalCount] = await Promise.all([
                    getCoins(perPage, page),
                    getTotalCoins()
                ]);
                setCoins(coinsData);
                setTotal(totalCount);
                setError(null);
            } catch (err) {
                setError('Ошибка при загрузке данных');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, perPage]);

    const filteredSortedCoins = coins
        .filter(coin =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'price':
                    comparison = a.current_price - b.current_price;
                    break;
                case 'market_cap':
                    comparison = a.market_cap - b.market_cap;
                    break;
                case 'volume':
                    comparison = a.total_volume - b.total_volume;
                    break;
                case 'price_change_24h':
                    comparison = a.price_change_percentage_24h - b.price_change_percentage_24h;
                    break;
            }
            return sortAsc ? comparison : -comparison;
        });

    const toggleSortAsc = () => setSortAsc(!sortAsc);

    return (
        <CoinsContext.Provider
            value={{
                coins,
                loading,
                error,
                page,
                perPage,
                total,
                searchTerm,
                sortBy,
                sortAsc,
                setPage,
                setPerPage,
                setSearchTerm,
                setSortBy,
                toggleSortAsc,
                filteredSortedCoins,
            }}
        >
            {children}
        </CoinsContext.Provider>
    );
};

export const useCoins = () => {
    const context = useContext(CoinsContext);
    if (!context) {
        throw new Error('useCoins must be used within CoinsProvider');
    }
    return context;
};
