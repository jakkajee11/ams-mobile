import { useEffect } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import createInstance from '~apis/createInstance';
import { APP_CONFIG } from '~constants/Config';
axios.defaults.baseURL = APP_CONFIG.apiEndpoint;
axios.defaults.headers.common['Authorization'] = 'Bearer ';

axios.interceptors.response.use(
  (response): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
    //console.log('interceptors', response);
    return response;
  }
);

const instance = createInstance();

const createResponse = async (
  response:
    | AxiosResponse<any>
    | Promise<AxiosResponse<any>>
    | Promise<any>
    | any
) => {
  const res = await Promise.resolve(response);
  //console.log('res.useApi', res, response);
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

const baseApi = {
  get: async function (url: string, config?: AxiosRequestConfig) {
    console.log('api.get', url);
    var r = await instance.get(url, config);
    return createResponse(await instance.get(url, config));
  },
  post: async function (url: string, data?: any, config?: AxiosRequestConfig) {
    return createResponse(await instance.post(url, data, config));
  },
  put: async function (url: string, data?: any, config?: AxiosRequestConfig) {
    return createResponse(await instance.put(url, data, config));
  },
  delete: async function (url: string, config?: AxiosRequestConfig) {
    return createResponse(await instance.delete(url, config));
  },
};

export default baseApi;
