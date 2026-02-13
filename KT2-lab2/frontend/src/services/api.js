import axios from 'axios';

const API_URL = '/api';

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const startParsing = async (category, maxPages) => {
  const response = await axios.post(`${API_URL}/parse`, {
    category,
    maxPages
  });
  return response.data;
};

export const getBooks = async (page = 1, limit = 1000) => {
  const response = await axios.get(`${API_URL}/books`, {
    params: { page, limit }
  });
  return response.data;
};

export const searchBooks = async (filters) => {
  const response = await axios.get(`${API_URL}/books/search`, {
    params: filters
  });
  return response.data;
};

export const getStatistics = async () => {
  const response = await axios.get(`${API_URL}/books/statistics`);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/books/${id}`);
  return response.data;
};

export const deleteAllBooks = async () => {
  const response = await axios.delete(`${API_URL}/books`);
  return response.data;
};
