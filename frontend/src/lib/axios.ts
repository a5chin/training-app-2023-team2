import Axios, { InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';

function loggingRequestInterceptor(config: InternalAxiosRequestConfig) {
  console.log(`Send ${config.method} to ${config.url}`);
  return config;
}

export const axios = Axios.create({
  baseURL: `${API_URL}/api/v1`,
});

axios.interceptors.request.use(loggingRequestInterceptor);
axios.interceptors.request.use((request) => {
  if (request.url && request.url[request.url.length - 1] !== '/') {
    request.url += '/';
  }
  return request;
});
axios.interceptors.response.use(
  (response) => {
    console.log(`success: ${JSON.stringify(response)}`);
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(`error: ${message}`);

    return Promise.reject(error);
  }
);
