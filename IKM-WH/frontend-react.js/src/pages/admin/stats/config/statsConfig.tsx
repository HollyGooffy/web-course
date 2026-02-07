import { 
    TrendingUp, 
    Users, 
    Eye, 
    DollarSign, 
    Music, 
    Calendar, 
    BarChart3, 
    Zap 
} from 'lucide-react';
import { StatItem, ActivityItem, QuickStatItem, StatsData } from '../model/types';

export const createMainStats = (data: StatsData): StatItem[] => [
    { 
        icon: <Users size={24} />, 
        label: 'Всего групп', 
        value: data.totalGroups.toString(), 
        change: `${data.totalGroups} активных`,
        isReal: true
    },
    { 
        icon: <Calendar size={24} />, 
        label: 'Всего событий', 
        value: data.totalEvents.toString(), 
        change: `${data.totalEvents} в афише`,
        isReal: true
    },
    { 
        icon: <Music size={24} />, 
        label: 'Активных заявок', 
        value: data.pendingApplications.toString(), 
        change: `${data.totalApplications} всего`,
        isReal: true
    },
    { 
        icon: <Eye size={24} />, 
        label: 'Просмотры афиш', 
        value: 'Coming Soon', 
        change: 'Аналитика в разработке',
        isReal: false
    },
];

export const createAdditionalStats = (data: StatsData): StatItem[] => [
    {
        icon: <DollarSign size={24} />,
        label: 'Общий доход',
        value: 'Coming Soon',
        change: 'Система платежей в разработке',
        isReal: false
    },
    {
        icon: <BarChart3 size={24} />,
        label: 'Позиций мерча',
        value: data.totalMerch.toString(),
        change: `${data.totalMerch} товаров`,
        isReal: true
    },
    {
        icon: <Zap size={24} />,
        label: 'Наборов карточек',
        value: data.totalCardSets.toString(),
        change: `${data.totalCardSets} наборов`,
        isReal: true
    },
    {
        icon: <TrendingUp size={24} />,
        label: 'Конверсия',
        value: 'Coming Soon',
        change: 'Метрики в разработке',
        isReal: false
    }
];

export const recentActivity: ActivityItem[] = [
    { action: 'Система статистики запущена', time: 'только что', isReal: true },
    { action: 'Загружены данные о группах', time: '1 минуту назад', isReal: true },
    { action: 'Обновлена афиша событий', time: '5 минут назад', isReal: true },
    { action: 'Аналитика продаж', time: 'Coming Soon', isReal: false },
];

export const createQuickStats = (data: StatsData): QuickStatItem[] => [
    { icon: Calendar, value: data.totalEvents, label: 'Событий в афише', isReal: true },
    { icon: Music, value: data.totalGroups, label: 'Зарегистрированных групп', isReal: true },
    { icon: Users, value: 'Coming Soon', label: 'Активных пользователей', isReal: false },
    { icon: DollarSign, value: 'Coming Soon', label: 'Доход за месяц', isReal: false }
];