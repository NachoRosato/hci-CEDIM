import axios from 'axios';
import { getRuntimeConfig } from '@/utils/runtimeConfig';

let cachedBaseUrl: string | null = null;

export async function axiosInstance() {
  if (!cachedBaseUrl) {
    const cfg = await getRuntimeConfig();
    cachedBaseUrl = cfg.BACKEND_URL;
  }

  const instance = axios.create({
    baseURL: cachedBaseUrl!,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (r) => r,
    (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        // aquí se puede disparar un evento/redirect si se requiere
      }
      return Promise.reject(error);
    }
  );

  return instance;
}


