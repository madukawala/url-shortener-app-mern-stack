import axios from 'axios';
import { Url, CreateUrlRequest, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const urlService = {
  createShortUrl: async (data: CreateUrlRequest): Promise<Url> => {
    const response = await api.post<ApiResponse<Url>>('/api/shorten', data);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to create short URL');
    }
    return response.data.data!;
  },

  getAllUrls: async (): Promise<Url[]> => {
    const response = await api.get<ApiResponse<Url[]>>('/api/urls');
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch URLs');
    }
    return response.data.data!;
  },

  getUrlStats: async (shortCode: string): Promise<Url> => {
    const response = await api.get<ApiResponse<Url>>(`/api/stats/${shortCode}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch URL stats');
    }
    return response.data.data!;
  },

  deleteUrl: async (id: string): Promise<void> => {
    const response = await api.delete<ApiResponse<null>>(`/api/urls/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete URL');
    }
  },
};

export default api;