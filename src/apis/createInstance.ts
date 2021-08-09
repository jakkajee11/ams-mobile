import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import merge from 'lodash/merge';

const DEFAULT_AXIOS_CONFIG = {
  baseURL: process.env.REACT_APP_API_ENDPOINT,
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

  return instance;
}
