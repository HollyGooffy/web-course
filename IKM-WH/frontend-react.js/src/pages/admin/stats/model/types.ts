import { ReactNode } from 'react';

export interface StatItem {
    icon: ReactNode;
    label: string;
    value: string;
    change: string;
    isReal: boolean;
}

export interface ActivityItem {
    action: string;
    time: string;
    isReal: boolean;
}

export interface QuickStatItem {
    icon: any;
    value: string | number;
    label: string;
    isReal: boolean;
}

export interface StatsData {
    totalGroups: number;
    totalEvents: number;
    totalApplications: number;
    totalMerch: number;
    totalCardSets: number;
    pendingApplications: number;
}