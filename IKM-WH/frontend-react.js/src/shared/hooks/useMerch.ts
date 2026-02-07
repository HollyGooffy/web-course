import { useState, useEffect } from 'react';
import { merchApi, MerchItem, CreateMerchData, UpdateMerchData } from '@shared/api/endpoints/merch.endpoints';

export const useMerch = () => {
  const [items, setItems] = useState<MerchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await merchApi.getAll();
      if (response.success) {
        setItems(response.data || []);
      } else {
        setError('Ошибка загрузки товаров');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки товаров');
      console.error('Error fetching merch items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const createItem = async (data: CreateMerchData, imageFile?: File) => {
    try {
      const response = await merchApi.create(data, imageFile);
      if (response.success) {
        setItems(prev => [...prev, response.data]);
        return response.data;
      }
      throw new Error('Ошибка создания товара');
    } catch (err: any) {
      setError(err.message || 'Ошибка создания товара');
      throw err;
    }
  };

  const updateItem = async (id: string, data: UpdateMerchData, imageFile?: File) => {
    try {
      const response = await merchApi.update(id, data, imageFile);
      if (response.success) {
        setItems(prev => prev.map(item => 
          item.id === id ? response.data : item
        ));
        return response.data;
      }
      throw new Error('Ошибка обновления товара');
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления товара');
      throw err;
    }
  };

  const updateStock = async (id: string, stock: number) => {
    try {
      const response = await merchApi.updateStock(id, stock);
      if (response.success) {
        setItems(prev => prev.map(item => 
          item.id === id ? response.data : item
        ));
        return response.data;
      }
      throw new Error('Ошибка обновления остатков');
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления остатков');
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setError(null);
      const response = await merchApi.delete(id);
      if (response.success) {
        setItems(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        throw new Error('Ошибка удаления товара');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Ошибка удаления товара';
      setError(errorMessage);
      console.error('Error deleting merch item:', err);
      throw err;
    }
  };

  return {
    items,
    loading,
    error,
    refetch: fetchItems,
    createItem,
    updateItem,
    updateStock,
    deleteItem,
  };
};