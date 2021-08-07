import useApi from '~hooks/useApi';
import { LoginModel } from '~types/auths';

const endpoint = 'auths';
export default function useAssetApi() {
  const { post } = useApi();

  const signIn = async (login: LoginModel) => {
    const url = `${endpoint}/signin`;
    return await post(url, login);
  };

  const signOut = async () => {
    const url = `${endpoint}/signout`;
    return await post(url);
  };

  return {
    signIn,
    signOut,
  };
}
