import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import merge from 'lodash/merge';
import Storages from '~utils/Storages';
import { SearchQuery } from '~types/queries';
import buildQueryString from '~utils/buildQueryString';
import { DEFAULT_AXIOS_CONFIG } from '~constants/Config';
import createInstance from '~apis/createInstance';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const axiosCancelMessage = 'Operation canceled';

const axiosConfig = merge({}, DEFAULT_AXIOS_CONFIG);

// axios.interceptors.response.use(
//   (response): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
//     return response;
//   },
//   (error: any) => {
//     console.warn(['interceptors.error', error]);
//     const response = error.response;
//     if (response && response.status === 401) {
//       source.cancel(axiosCancelMessage);
//       return Promise.resolve(response);
//     }
//     return Promise.resolve({ status: 203, statusText: error });
//   }
// );

const sleep = (ms: number) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

export default function useApi() {
  const instance = createInstance();

  const getConfig = async (config?: AxiosRequestConfig) => {
    const access_token = await Storages.getAccessToken();

    if (access_token) {
      return {
        ...config,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
    }

    return { ...axiosConfig, ...config };
  };

  const retryGet = async (url: string, cfg?: AxiosRequestConfig) => {
    const res = await instance.get(url, cfg);
    if (res && res.status === 401) {
      await sleep(1000);
      return await instance.post(url, cfg);
    }

    return res;
  };

  const retryPost = async (
    url: string,
    data?: any,
    cfg?: AxiosRequestConfig
  ) => {
    const res = await instance.post(url, data, cfg);
    if (res && res.status === 401) {
      await sleep(1000);
      return await instance.post(url, data, cfg);
    }

    return res;
  };

  return {
    instance,
    find: async function (route: string, query: SearchQuery) {
      const url = `${route}${buildQueryString(query)}`;
      const cfg = await getConfig();
      //return await instance.get(url, cfg);
      return await retryGet(url, cfg);
    },
    get: async function (url: string, config?: AxiosRequestConfig) {
      const cfg = await getConfig(config);
      //return await instance.get(url, cfg);
      return await retryGet(url, cfg);
    },
    patch: async function (
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ) {
      const cfg = await getConfig(config);
      return await instance.patch(url, data, cfg);
    },
    post: async function (
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ) {
      const cfg = await getConfig(config);
      //return await instance.post(url, data, cfg);
      return await retryPost(url, data, cfg);
    },
    put: async function (url: string, data?: any, config?: AxiosRequestConfig) {
      const cfg = await getConfig(config);
      return await instance.put(url, data, cfg);
    },
    delete: async function (url: string, config?: AxiosRequestConfig) {
      const cfg = await getConfig(config);
      return await instance.delete(url, cfg);
    },
    exportFile: async function (url: string, data: any) {
      const path = `${url}${buildQueryString(data)}`;
      const config = await getConfig();
      return await instance.get(path, {
        ...config,
        responseType: 'arraybuffer',
      });
    },
    postExportFile: async function (url: string, data: any) {
      const config = await getConfig();
      return await instance.post(url, data, {
        ...config,
        responseType: 'arraybuffer',
      });
    },
  };
}
