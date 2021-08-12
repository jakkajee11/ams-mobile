import useApi from '~hooks/useApi';
import { LoginModel, LogoutModel, RefreshTokenModel } from '~types/auths';

const endpoint = 'v1/auth';
export default function useAuthApi() {
  const { post } = useApi();

  const signIn = async (model: LoginModel) => {
    const url = `${endpoint}/login`;
    console.log(['signIN', url, model]);
    return await post(url, model);
  };

  const signOut = async (model: LogoutModel) => {
    const url = `${endpoint}/logout`;
    return await post(url, model);
  };

  const refreshToken = async (model: RefreshTokenModel) => {
    const url = `${endpoint}/token/refresh`;
    return await post(url, model);
  };

  return {
    signIn,
    signOut,
    refreshToken,
  };
}
