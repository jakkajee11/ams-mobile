export const DEFAULT_AXIOS_CONFIG = {
  baseUrl: process.env.REACT_APP_API_ENDPOINT,
};

export const APP_CONFIG = {
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID ?? '',
  apiEndpoint: process.env.REACT_APP_API_ENDPOINT ?? '',
};
