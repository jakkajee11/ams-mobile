import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import Storages from '~utils/Storages';
import { SearchQuery } from '~types/queries';
import buildQueryString from '~utils/buildQueryString';
import { DEFAULT_AXIOS_CONFIG } from '~constants/Config';
//axios.defaults.baseURL = 'https://api-dev.thjh-ams.com/api/'; //'https://49.49.241.176:5001/api/'; //process.env.REACT_APP_API_ENDPOINT;
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
//axios.defaults.headers.common['Authorization'] = 'Bearer ';

console.log([
  'process.env.REACT_APP_API_ENDPOINT  ',
  process.env.REACT_APP_API_ENDPOINT,
]);

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const axiosCancelMessage = 'Operation canceled';

axios.interceptors.response.use(
  (response): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
    return response;
  },
  (error: any) => {
    const response = error.response;
    console.error(['interceptors.error', error]);
    if (response && response.status === 401) {
      source.cancel(axiosCancelMessage);
      // try to refresh token
      axios
        .post('v1/auth/token/refresh', { clientId: '', refreshToken: '' })
        .then((res) => {
          if (res.status === 200) {
            Storages.saveUserToken(res.data).then((res) => {
              console.log('userToken saved');
              return Promise.resolve({
                status: 200,
                data: 'retry',
                statusText: 'retry',
              });
            });
          } else {
            console.warn('refreshToken failed!');
          }
        });
    }
    return Promise.reject(response);
  }
);

export default function useApi(createNewInstance?: boolean) {
  const instance = !!createNewInstance ? axios.create() : axios;
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
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      };
    }
    console.log(['getConfig', { ...DEFAULT_AXIOS_CONFIG, ...config }]);
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
      console.log(['get', url, config]);
      return await instance.get(url, getConfig(config));
    },
    post: async function (
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ) {
      console.log(['post', instance.defaults]);
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
