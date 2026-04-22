import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import { authorizationService } from '../AuthorizationService';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';
import { getSecureData, removeToken } from '@/utils/keychainStorage';

interface QueuedRequest {
  resolve: (value: { accessToken?: string }) => void;
  reject: (reason: unknown) => void;
}

let failedQueue: QueuedRequest[] = [];

export const createAuthorizedApiClient = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
  });

  const processQueue = (error: Error | null, accessToken?: string) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve({ accessToken });
      }
    });
    failedQueue = [];
  };

  const onRequest = async (request: AxiosRequestConfig) => {
    let accessToken = await getSecureData('');
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    const appId = Config?.APPLICATION_ID;

    if (appId) {
      request.headers['x-app-id'] = appId;
    }
    return request;
  };

  const onResponseSuccess = (response: AxiosResponse) => response;

  const onResponseFailed = (error: AxiosError) => {
    return Promise.reject(error);
  };

  instance.interceptors.request.use(onRequest);
  instance.interceptors.response.use(onResponseSuccess, onResponseFailed);

  return instance;
};
