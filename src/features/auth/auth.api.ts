import axios from 'axios';
import { api } from '../../lib/axios';
import type { IApiResponse, IAuthSession, ILoginPayload, ITenantMembership } from './auth.types';

export const authApi = {
  async login(payload: ILoginPayload): Promise<IAuthSession> {
    const response = await api.post<IApiResponse<IAuthSession>>('/auth/login', payload);

    return response.data.data;
  },

  async me(): Promise<IAuthSession | null> {
    try {
      const response = await api.get<IApiResponse<IAuthSession>>('/api/auth/me');

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return null;
      }

      throw error;
    }
  },

  async register(payload: {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) {
    const response = await api.post('/auth/register', payload);

    return response.data;
  },

  async memberships(): Promise<ITenantMembership[]> {
    const response = await api.get<IApiResponse<ITenantMembership[]>>('/api/tenants');

    return response.data.data;
  },
};
