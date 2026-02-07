import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CoinDetailsType } from "@/types";
import { getCoinById, getMarketChart } from "@/lib/api/api.ts";
import { Button } from "@/components/ui/button.tsx";
import CoinChart from "@/components/CoinChart/CoinChart.tsx";
import { format } from 'date-fns';
import { ArrowLeft, BarChart, BookOpen, Info, Layers, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CoinDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [coin, setCoin] = useState<CoinDetailsType | null>(null);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                if (!id) return;
                setLoading(true);
                const data = await getCoinById(id);
                setCoin(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCoin();
    }, [id]);

    useEffect(() => {
        if (!id) return;

        const fetchChart = async () => {
            try {
                const data = await getMarketChart(id, 7);
                const formatted = data.prices.map(([timestamp, price]: [number, number]) => ({
                    x: format(new Date(timestamp), 'MMM d'),
                    y: price,
                }));
                setChartData(formatted);
            } catch (err) {
                console.error('Ошибка при загрузке графика:', err);
            }
        };

        fetchChart();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex items-center mb-8">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="ml-4">
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-card rounded-xl p-4 border border-border">
                            <Skeleton className="h-5 w-20 mb-2" />
                            <Skeleton className="h-7 w-full" />
                        </div>
                    ))}
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-4 w-full" />
                        ))}
                    </div>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-64 w-full rounded-lg" />
                </div>
            </div>
        );
    }

    if (!coin) return (
        <div className="container mx-auto px-4 py-20 max-w-md text-center">
            <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
                <div className="mx-auto w-20 h-20 rounded-full bg-[var(--chart-5)/20] flex items-center justify-center mb-6">
                    <Info className="text-[var(--chart-5)]" size={40} />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Монета не найдена</h2>
                <p className="text-muted-foreground mb-6">
                    Криптовалюта с указанным идентификатором не существует или была удалена
                </p>
                <Button
                    onClick={() => navigate(-1)}
                    className="gap-2 bg-[var(--chart-3)] text-primary-foreground"
                >
                    <ArrowLeft size={18} />
                    Вернуться назад
                </Button>
            </div>
        </div>
    );

    // Форматирование чисел
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: value < 1 ? 4 : 2,
            maximumFractionDigits: value < 1 ? 6 : 2
        }).format(value);
    };

    const formatNumber = (value: number) => {
        if (value >= 1_000_000_000) {
            return `$${(value / 1_000_000_000).toFixed(2)}B`;
        }
        if (value >= 1_000_000) {
            return `$${(value / 1_000_000).toFixed(2)}M`;
        }
        return `$${value.toLocaleString()}`;
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10 border-border"
                >
                    <ArrowLeft size={18} />
                </Button>
                <div className="flex items-center gap-4">
                    <img
                        src={coin.image.large}
                        alt={coin.name}
                        className="w-12 h-12 rounded-full bg-accent p-1 shadow-md border border-border"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            {coin.name} <span className="text-muted-foreground font-normal">({coin.symbol.toUpperCase()})</span>
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-1">
                            <span>Ранг:</span>
                            <span className="font-medium text-foreground">#{coin.market_cap_rank}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-[var(--chart-3)/10] to-[var(--chart-3)/20]
                rounded-xl p-4 border border-[var(--chart-3)/30]">
                    <p className="text-muted-foreground text-sm flex items-center gap-1 mb-1">
                        <TrendingUp size={16} />
                        <span>Цена</span>
                    </p>
                    <p className="text-xl font-bold text-foreground">
                        {formatCurrency(coin.market_data.current_price.usd)}
                    </p>
                    <p className={`mt-1 text-sm font-medium ${
                        coin.market_data.price_change_percentage_24h >= 0
                            ? 'text-[var(--chart-4)]'
                            : 'text-[var(--chart-5)]'
                    }`}>
                        {coin.market_data.price_change_percentage_24h?.toFixed(2) || 0}%
                    </p>
                </div>

                <div className="bg-gradient-to-br from-[var(--chart-1)/10] to-[var(--chart-1)/20] rounded-xl p-4
                border border-[var(--chart-1)/30]">
                    <p className="text-muted-foreground text-sm flex items-center gap-1 mb-1">
                        <Layers size={16} />
                        <span>Капитализация</span>
                    </p>
                    <p className="text-xl font-bold text-foreground">
                        {formatNumber(coin.market_data.market_cap.usd)}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-[var(--chart-5)/10] to-[var(--chart-5)/20] rounded-xl p-4
                border border-[var(--chart-5)/30]">
                    <p className="text-muted-foreground text-sm flex items-center gap-1 mb-1">
                        <BarChart size={16} />
                        <span>Объем (24ч)</span>
                    </p>
                    <p className="text-xl font-bold text-foreground">
                        {formatNumber(coin.market_data.total_volume.usd)}
                    </p>
                </div>
            </div>

            <div className="bg-card rounded-2xl shadow-lg p-6 mb-8 border border-border">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="text-[var(--chart-3)]" size={24} />
                    <h2 className="text-xl font-bold text-foreground">Описание</h2>
                </div>

                <div
                    className={`prose max-w-none text-muted-foreground ${
                        !showFullDescription ? 'line-clamp-5' : ''
                    }`}
                    dangerouslySetInnerHTML={{
                        __html: coin.description.en || "Нет описания."
                    }}
                />

                {coin.description.en && coin.description.en.length > 500 && (
                    <Button
                        variant="link"
                        className="mt-4 px-0 text-[var(--chart-3)]"
                        onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                        {showFullDescription ? 'Свернуть' : 'Читать далее...'}
                    </Button>
                )}
            </div>

            <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                    <BarChart className="text-[var(--chart-1)]" size={24} />
                    <h2 className="text-xl font-bold text-foreground">
                        График цены за 7 дней
                    </h2>
                </div>

                {chartData.length > 0 ? (
                    <CoinChart data={chartData} />
                ) : (
                    <div className="h-64 flex items-center justify-center bg-accent/30 rounded-lg
                    border border-dashed border-border">
                        <p className="text-muted-foreground">
                            Данные графика временно недоступны
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoinDetails;