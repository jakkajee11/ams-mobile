import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import Storages from '~utils/Storages';
import { SearchQuery } from '~types/queries';
import buildQueryString from '~utils/buildQueryString';
import { APP_CONFIG, DEFAULT_AXIOS_CONFIG } from '~constants/Config';
import createInstance from '~apis/createInstance';
//axios.defaults.baseURL = 'https://api-dev.thjh-ams.com/api/'; //'https://49.49.241.176:5001/api/'; //process.env.REACT_APP_API_ENDPOINT;

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const axiosCancelMessage = 'Operation canceled';

axios.interceptors.response.use(
  (response): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
    return response;
  },
  (error: any) => {
    console.warn(['interceptors.error', error]);
    const response = error.response;
    if (response && response.status === 401) {
      source.cancel(axiosCancelMessage);
      return Promise.resolve(response);
    }
    return Promise.resolve({ status: 203, statusText: error });
  }
);

export default function useApi() {
  const instance = createInstance();
  const [token, setToken] = useState<string | null>(null);

  const setBearer = async () => {
    const access_token = await Storages.getAccessToken();

    if (access_token) {
      setToken(access_token);
      instance.defaults.headers.common['Authorization'] = `Bearer ${
        access_token ?? ''
      }`;
    }
  };

  const getConfig = (config?: AxiosRequestConfig) => {
    if (!token) setBearer();

    if (token) {
      return {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return { ...DEFAULT_AXIOS_CONFIG, ...config };
  };

  useEffect(() => {
    setBearer();
  }, []);

  return {
    instance,
    find: async function (route: string, query: SearchQuery) {
      const url = `${route}${buildQueryString(query)}`;

      return await instance.get(url);
    },
    get: async function (url: string, config?: AxiosRequestConfig) {
      return await instance.get(url, getConfig(config));
    },
    post: async function (
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ) {
      return await instance.post(url, data, getConfig(config));
    },
    put: async function (url: string, data?: any, config?: AxiosRequestConfig) {
      return await instance.put(url, data, getConfig(config));
    },
    delete: async function (
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ) {
      return await instance.delete(url, getConfig(config));
    },
    exportFile: async function (url: string, data: any) {
      const path = `${url}${buildQueryString(data)}`;
      return await instance.get(path, {
        ...getConfig(),
        responseType: 'arraybuffer',
      });
    },
    postExportFile: async function (url: string, data: any) {
      return await instance.post(url, data, {
        ...getConfig(),
        responseType: 'arraybuffer',
      });
    },
  };
}
