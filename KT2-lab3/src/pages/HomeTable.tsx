import { useCoins } from '@/contexts/CoinsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ArrowDown,
    ArrowUp,
    Search,
    TrendingUp,
    TrendingDown,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

export default function HomeTable() {
    const navigate = useNavigate();
    const {
        filteredSortedCoins,
        loading,
        perPage,
        searchTerm,
        sortBy,
        sortAsc,
        setPerPage,
        setSearchTerm,
        setSortBy,
        toggleSortAsc,
    } = useCoins();

    const handlePerPageChange = (value: string) => {
        setPerPage(Number(value));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
        }).format(price);
    };

    const formatNumber = (num: number) => {
        if (num >= 1_000_000_000) {
            return `$${(num / 1_000_000_000).toFixed(2)}B`;
        }
        if (num >= 1_000_000) {
            return `$${(num / 1_000_000).toFixed(2)}M`;
        }
        return `$${num.toLocaleString()}`;
    };

    const renderSkeletonRows = () => {
        return Array.from({ length: 10 }).map((_, idx) => (
            <tr key={idx} className="border-b border-border">
                <td className="p-4"><Skeleton className="h-4 w-12" /></td>
                <td className="p-4">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </td>
                <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                <td className="p-4"><Skeleton className="h-4 w-24" /></td>
            </tr>
        ));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--chart-3)] to-[var(--chart-1)] bg-clip-text text-transparent">
                    Криптовалютный Трекер
                </h1>
                <p className="mt-2 text-base text-muted-foreground max-w-2xl mx-auto">
                    Отслеживайте актуальные курсы криптовалют в табличном формате
                </p>
            </div>

            <div className="mx-auto" style={{ maxWidth: '1440px' }}>
                <div className="bg-card rounded-2xl shadow-lg p-6 mb-8 border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Поиск монеты по названию или символу..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-5 px-4 pl-12 rounded-xl border-border focus:ring-2 focus:ring-[var(--chart-3)]"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-between">
                        <div className="flex flex-wrap gap-3">
                            <Select onValueChange={(value) => setSortBy(value as any)} value={sortBy}>
                                <SelectTrigger className="w-[200px] border-border">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="market_cap">По капитализации</SelectItem>
                                    <SelectItem value="name">По имени</SelectItem>
                                    <SelectItem value="price">По цене</SelectItem>
                                    <SelectItem value="volume">По объему</SelectItem>
                                    <SelectItem value="price_change_24h">По изменению</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                onClick={toggleSortAsc}
                                variant="outline"
                                className="flex items-center gap-2 border-border"
                            >
                                {sortAsc ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                                <span>{sortAsc ? 'По возрастанию' : 'По убыванию'}</span>
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">На странице:</span>
                            <Select onValueChange={handlePerPageChange} value={String(perPage)}>
                                <SelectTrigger className="w-[80px] border-border">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed">
                            <thead className="bg-accent/50">
                                <tr className="border-b border-border">
                                    <th className="p-4 text-left text-sm font-semibold text-foreground" style={{ width: '80px' }}>#</th>
                                    <th className="p-4 text-left text-sm font-semibold text-foreground" style={{ width: '280px' }}>Монета</th>
                                    <th className="p-4 text-right text-sm font-semibold text-foreground" style={{ width: '180px' }}>Цена</th>
                                    <th className="p-4 text-right text-sm font-semibold text-foreground" style={{ width: '140px' }}>24ч %</th>
                                    <th className="p-4 text-right text-sm font-semibold text-foreground" style={{ width: '200px' }}>Капитализация</th>
                                    <th className="p-4 text-right text-sm font-semibold text-foreground" style={{ width: '200px' }}>Объем (24ч)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    renderSkeletonRows()
                                ) : filteredSortedCoins.length > 0 ? (
                                    filteredSortedCoins.map((coin) => (
                                        <tr
                                            key={coin.id}
                                            className="border-b border-border hover:bg-accent/30 transition-colors cursor-pointer"
                                            onClick={() => navigate(`/coin/${coin.id}`)}
                                        >
                                            <td className="p-4 text-sm text-muted-foreground font-medium">
                                                {coin.market_cap_rank}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="font-semibold text-foreground truncate">{coin.name}</div>
                                                        <div className="text-sm text-muted-foreground uppercase truncate">{coin.symbol}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right font-semibold text-foreground">
                                                {formatPrice(coin.current_price)}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div
                                                    className={`flex items-center justify-end gap-1 font-semibold ${
                                                        coin.price_change_percentage_24h >= 0
                                                            ? 'text-green-500'
                                                            : 'text-red-500'
                                                    }`}
                                                >
                                                    {coin.price_change_percentage_24h >= 0 ? (
                                                        <TrendingUp size={16} />
                                                    ) : (
                                                        <TrendingDown size={16} />
                                                    )}
                                                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                                </div>
                                            </td>
                                            <td className="p-4 text-right font-medium text-foreground">
                                                {formatNumber(coin.market_cap)}
                                            </td>
                                            <td className="p-4 text-right font-medium text-foreground">
                                                {formatNumber(coin.total_volume)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-10 text-center">
                                            <div className="text-muted-foreground">
                                                Монеты не найдены
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
