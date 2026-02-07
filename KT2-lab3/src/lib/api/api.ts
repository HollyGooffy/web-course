import axios from "axios";
import type { Coin } from '@/types/coins.types.ts';
import type { CoinDetailsType } from "@/types/coinsDetail.type.ts";

const BASE_URL = 'http://localhost:3001/api';

export const getCoins = async (perPage = 10, page = 1): Promise<Coin[]> => {
    const response = await axios.get<Coin[]>(
        `${BASE_URL}/coins/markets`,
        {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: perPage,
                page,
                sparkline: false,
            },
        }
    );
    return response.data;
};

export const getTotalCoins = async (): Promise<number> => {
    const response = await axios.get(`${BASE_URL}/coins/list`);
    return response.data.length;
};

export const getCoinById = async (id: string): Promise<CoinDetailsType> => {
    const response = await axios.get(`${BASE_URL}/coins/${id}`);
    return response.data;
};

export const getMarketChart = async (
    id: string,
    days: number = 7,
    currency: string = 'usd'
) => {
    const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
        params: {
            vs_currency: currency,
            days,
        },
    });

    return response.data;
};