export const DEFAULT_AXIOS_CONFIG = {
  baseURL: process.env.API_ENDPOINT,
};

export const APP_CONFIG = {
  clientId: process.env.AUTH_CLIENT_ID ?? '',
  apiEndpoint: process.env.API_ENDPOINT ?? '',
};
