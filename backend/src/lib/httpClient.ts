import axios, { AxiosError, type AxiosInstance } from 'axios';
import { randomUUID } from 'node:crypto';

const REQUEST_ID_HEADER = 'x-request-id';
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 15_000;

export const httpClient: AxiosInstance = axios.create({
  timeout: DEFAULT_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  config.headers.set(REQUEST_ID_HEADER, randomUUID());
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as
      | (typeof error.config & { __retryCount?: number })
      | undefined;
    const status = error.response?.status ?? 0;
    const retryable = status >= 500 || status === 0 || error.code === 'ECONNABORTED';

    if (!config || !retryable || (config.__retryCount ?? 0) >= MAX_RETRIES) {
      console.error('[httpClient] request failed', {
        url: config?.url,
        method: config?.method,
        status,
        message: error.message,
      });
      throw error;
    }

    config.__retryCount = (config.__retryCount ?? 0) + 1;
    const delay = 2 ** config.__retryCount * 200;
    await new Promise((r) => setTimeout(r, delay));
    return httpClient.request(config);
  },
);