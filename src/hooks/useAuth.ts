import Storages from '~utils/Storages';

export default function useAuth() {
  const isLoggedIn = async () => {
    const accesToken = await Storages.getAccessToken();
    return !!accesToken;
  };

  return {
    isLoggedIn,
  };
}
