import { useState, useEffect } from 'react';
import { statsApi, DashboardStats, GeneralStats } from '@shared/api/endpoints/stats.endpoints';

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await statsApi.getDashboard();
      if (response.success) {
        setStats(response.data);
      } else {
        setError('Ошибка загрузки статистики');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки статистики');
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};

export const useGeneralStats = () => {
  const [stats, setStats] = useState<GeneralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await statsApi.getGeneral();
      if (response.success) {
        setStats(response.data);
      } else {
        setError('Ошибка загрузки статистики');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки статистики');
      console.error('Error fetching general stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};