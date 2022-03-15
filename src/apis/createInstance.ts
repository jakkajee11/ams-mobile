import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import merge from 'lodash/merge';
import { APP_CONFIG } from '~constants/Config';
import { refreshAuth } from '~utils/auth';

const DEFAULT_AXIOS_CONFIG = {
  baseURL: APP_CONFIG.apiEndpoint,
};

export default function createInstance(
  enhancedConfig?: AxiosRequestConfig
): AxiosInstance {
  const options: AxiosRequestConfig = merge(
    {},
    DEFAULT_AXIOS_CONFIG,
    enhancedConfig
  );
  const instance = axios.create(options);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const axiosCancelMessage = 'Operation canceled';

  instance.interceptors.response.use(
    (response): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
      return response;
    },
    (error: any) => {
      console.warn(['interceptors.error', error]);
      const response = error.response;
      if (response && response.status === 401) {
        console.log(['status 401: re-login attempt...']);
        source.cancel(axiosCancelMessage);
        refreshAuth();
        return Promise.resolve(response);
      } else if (response.status === 404) {
        return Promise.resolve(response);
      }
      return Promise.resolve({ status: 203, statusText: error });
    }
  );

  return instance;
}
