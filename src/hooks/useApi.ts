import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import createInstance from '../apis/createInstance';
import { Type } from 'typescript';
import { DataTableResult, StandardResult } from '~types/dataTable';
import { defaultAxiosConfig } from '~constants/api';
import Storages from '~utils/storages';
import { SearchQuery } from '~types/searchQuery';
import buildQueryString from '~utils/buildQueryString';
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
//axios.defaults.headers.common['Authorization'] = 'Bearer ';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const axiosCancelMessage = 'Operation canceled';

const createStandardResponse = async (
  response: AxiosResponse<any> | Promise<AxiosResponse<any>> | Promise<any>
): Promise<StandardResult<any>> => {
  const res = await Promise.resolve(response);

  if (res.status === 200) {
    return {
      status: 200,
      data: res.data,
    };
  }

  // if (_.isArray(response)) {
  //   return {
  //     status: 200,
  //     data: {
  //       rows: response,
  //       totalRows: response?.length,
  //     },
  //   };
  // }

  return res;
};

const createResponse = async (
  response: AxiosResponse<any> | Promise<AxiosResponse<any>> | Promise<any>
  //| any
): Promise<DataTableResult<any>> => {
  const res = await Promise.resolve(response);

  if (res.status === 200) {
    return {
      status: 200,
      data: {
        rows: res.data,
        totalRows: res.data?.length,
      },
    };
  }

  if (_.isArray(response)) {
    return {
      status: 200,
      data: {
        rows: response,
        totalRows: response?.length,
      },
    };
  }

  return res;
};

axios.interceptors.response.use(
  (response): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
    return response;
  },
  (error: any) => {
    const response = error.response;
    console.error(['interceptors.error', error]);
    if (response && response.status === 401) {
      source.cancel(axiosCancelMessage);
      authManager.signinRedirect({
        state: { returnUrl: window.location.pathname },
      });
    }
    return Promise.reject(error.response);
  }
);

export default function useApi(createNewInstance?: boolean) {
  const access_token = Storages.getAccessToken();
  const [token, setToken] = useState(
    access_token || authStore?.value?.access_token
  );
  const instance = !!createNewInstance ? axios.create() : axios;

  const setBearer = () => {
    const access_token = Storages.getAccessToken();
    const authState = authStore?.value;
    const token = access_token || authState?.access_token;
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const getConfig = (config?: AxiosRequestConfig) => {
    if (token) {
      return {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return { ...defaultAxiosConfig, ...config };
  };

  useEffect(() => {
    setBearer();
    setToken(authStore.value?.access_token);
  }, [authStore]);

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
