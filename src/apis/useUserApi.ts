import useApi from '~hooks/useApi';
import { UpdateUserPushTokenModel } from '~types/users';

const endpoint = 'v1/users';
export default function useUserApi() {
  const { patch, get } = useApi();

  const getMyProfile = async () => {
    const url = `${endpoint}/me`;
    return await get(url);
  };

  const updateUserNotificationToken = async (
    model: UpdateUserPushTokenModel
  ) => {
    const url = `${endpoint}/pushToken`;
    return await patch(url, model);
  };

  const resetPassword = async (email: string) => {
    const url = `${endpoint}/password/reset`;
    return await patch(url, { email });
  };

  return {
    getMyProfile,
    updateUserNotificationToken,
    resetPassword,
  };
}
