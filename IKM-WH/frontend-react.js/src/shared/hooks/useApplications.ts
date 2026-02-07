import { useState, useEffect } from 'react';
import { applicationsApi, Application, CreateApplicationData, UpdateApplicationData } from '@shared/api/endpoints/applications.endpoints';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await applicationsApi.getAll();
      if (response.success) {
        setApplications(response.data);
      } else {
        setError('Ошибка загрузки заявок');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки заявок');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const createApplication = async (data: CreateApplicationData) => {
    try {
      const response = await applicationsApi.create(data);
      if (response.success) {
        setApplications(prev => [...prev, response.data]);
        return response.data;
      }
      throw new Error('Ошибка создания заявки');
    } catch (err: any) {
      setError(err.message || 'Ошибка создания заявки');
      throw err;
    }
  };

  const updateApplication = async (id: string, data: UpdateApplicationData) => {
    try {
      const response = await applicationsApi.update(id, data);
      if (response.success) {
        setApplications(prev => prev.map(app => 
          app.id === id ? response.data : app
        ));
        return response.data;
      }
      throw new Error('Ошибка обновления заявки');
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления заявки');
      throw err;
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const response = await applicationsApi.delete(id);
      if (response.success) {
        setApplications(prev => prev.filter(app => app.id !== id));
      } else {
        throw new Error('Ошибка удаления заявки');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления заявки');
      throw err;
    }
  };

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    createApplication,
    updateApplication,
    deleteApplication,
  };
};