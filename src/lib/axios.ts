import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { queryClient } from '../query-client';
import { API_URL } from '../config/env';

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshPromise: Promise<void> | null = null;
let logoutPromise: Promise<void> | null = null;

let sessionExpiredHandler: (() => void) | null = null;

export function setSessionExpiredHandler(handler: () => void) {
  sessionExpiredHandler = handler;
}

const isAuthEndpoint = (url?: string) =>
  /\/api\/auth\/(login|register|refresh|logout)$/.test(url ?? '');

async function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post('/api/auth/refresh')
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      isAuthEndpoint(original.url)
    ) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      await refreshSession();
      // Browser sends the newly rotated cookies automatically.
      return api(original);
    } catch (refreshError) {
      await queryClient.cancelQueries();

      queryClient.setQueryData(['auth', 'me'], null);
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] !== 'auth',
      });

      sessionExpiredHandler?.();

      return Promise.reject(refreshError);
    }
  },
);

export async function revokeSession(): Promise<void> {
  if (!logoutPromise) {
    logoutPromise = refreshClient
      .post('/api/auth/logout')
      .then(() => undefined)
      .finally(() => {
        logoutPromise = null;
      });
  }

  return logoutPromise;
}
