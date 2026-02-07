import axios from 'axios';

const API_URL = '/api';

export const startParsing = async (searchQuery, city, maxPages, source = 'api') => {
  const response = await axios.post(`${API_URL}/parse`, {
    searchQuery,
    city,
    maxPages,
    source
  });
  return response.data;
};

export const getCars = async (page = 1, limit = 1000) => {
  const response = await axios.get(`${API_URL}/cars`, {
    params: { page, limit }
  });
  return response.data;
};

export const searchCars = async (filters) => {
  const response = await axios.get(`${API_URL}/cars/search`, {
    params: filters
  });
  return response.data;
};

export const getStatistics = async () => {
  const response = await axios.get(`${API_URL}/cars/statistics`);
  return response.data;
};

export const deleteCar = async (id) => {
  const response = await axios.delete(`${API_URL}/cars/${id}`);
  return response.data;
};

export const deleteAllCars = async () => {
  const response = await axios.delete(`${API_URL}/cars`);
  return response.data;
};

export const addTestData = async () => {
  const response = await axios.get(`${API_URL}/test/seed`);
  return response.data;
};
