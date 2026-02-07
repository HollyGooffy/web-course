import { apiClient } from '../client';

export interface DashboardStats {
  totalGroups: number;
  totalEvents: number;
  totalApplications: number;
  totalMerch: number;
  pendingApplications: number;
  upcomingEvents: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  action: string;
  target: string;
  user: string;
  timestamp: string;
}

export interface GeneralStats {
  users: number;
  groups: number;
  events: number;
  applications: number;
  merch: number;
}

export const statsApi = {
  getDashboard: async (): Promise<{ success: boolean; data: DashboardStats }> => {
    return apiClient.get('/stats/dashboard');
  },

  getGeneral: async (): Promise<{ success: boolean; data: GeneralStats }> => {
    return apiClient.get('/stats');
  },
};