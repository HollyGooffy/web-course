import express from 'express';
import axios from 'axios';
import cors from 'cors';
import NodeCache from 'node-cache';

const app = express();
const PORT = 3001;

app.use(cors());

const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

app.get('/', (req, res) => {
    res.send('API сервер работает 🚀');
});

app.get('/api/coins/markets', async (req, res) => {
    const cacheKey = `markets-${JSON.stringify(req.query)}`;
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log('📦 Возврат из кэша: /api/coins/markets');
        return res.json(cached);
    }

    try {
        console.log('🌐 Запрос к CoinGecko API: /coins/markets');
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: req.query,
        });

        cache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        console.error('❌ Ошибка при получении монет:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Не удалось получить данные' });
    }
});

app.get('/api/coins/list', async (req, res) => {
    const cached = cache.get('coins-list');
    if (cached) {
        console.log('📦 Возврат из кэша: /api/coins/list');
        return res.json(cached);
    }

    try {
        console.log('🌐 Запрос к CoinGecko API: /coins/list');
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        cache.set('coins-list', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('❌ Ошибка при получении списка:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Не удалось получить список' });
    }
});

app.get('/api/coins/:id', async (req, res) => {
    const id = req.params.id;
    const cached = cache.get(`coin-${id}`);
    if (cached) {
        console.log(`📦 Возврат из кэша: /api/coins/${id}`);
        return res.json(cached);
    }

    try {
        console.log(`🌐 Запрос к CoinGecko API: /coins/${id}`);
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        cache.set(`coin-${id}`, response.data);
        res.json(response.data);
    } catch (error) {
        console.error('❌ Ошибка при получении монеты по ID:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Не удалось получить данные монеты' });
    }
});

app.get('/api/coins/:id/market_chart', async (req, res) => {
    const { id } = req.params;
    const { vs_currency, days } = req.query;
    const cacheKey = `chart-${id}-${vs_currency}-${days}`;
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log(`📦 Возврат из кэша: /api/coins/${id}/market_chart`);
        return res.json(cached);
    }

    try {
        console.log(`🌐 Запрос к CoinGecko API: /coins/${id}/market_chart`);
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
            { params: { vs_currency, days } }
        );
        cache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        console.error('❌ Ошибка при получении графика:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Не удалось получить график' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
