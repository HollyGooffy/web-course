export interface CoinDetailsType{
    id: string
    name: string
    image: { large: string }
    market_data: {
        current_price: { usd: number }
        market_cap: { usd: number }
        total_volume: { usd: number }
        price_change_percentage_24h: number
    }
    description: { en: string }
    symbol: string
    market_cap_rank: string
}