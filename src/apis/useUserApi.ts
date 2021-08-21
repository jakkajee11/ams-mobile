import useApi from '~hooks/useApi';
import { LoginModel, LogoutModel, RefreshTokenModel } from '~types/auths';
import { UpdateNotificationTokenModel } from '~types/users';

const endpoint = 'v1/users';
export default function useUserApi() {
  const { patch } = useApi();

  const updateUserNotificationToken = async (
    model: UpdateNotificationTokenModel
  ) => {
    const url = `${endpoint}/pushToken`;
    return await patch(url, model);
  };

  return {
    updateUserNotificationToken,
  };
}
