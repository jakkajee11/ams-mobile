import useAuthApi from '~apis/useAuthApi';
import { APP_CONFIG } from '~constants/Config';
import Storages from './Storages';

export async function silentSignIn() {
  const { signIn } = useAuthApi();
  const userName = await Storages.getString('@__ui$');
  const password = await Storages.getString('@__us$');
  if (userName && userName.length > 0 && password && password.length > 0) {
    const signInResult = await signIn({
      clientId: APP_CONFIG.clientId,
      userName,
      password,
    });
    if (signInResult && signInResult.status === 200 && signInResult.data) {
      await Storages.saveUserToken(JSON.stringify(signInResult.data));
    }
  }
}

export async function silentRefreshToken() {
  const { refreshToken } = useAuthApi();

  const token = await Storages.getUserToken();
  if (token && token.refresh_token) {
    const res = await refreshToken({
      clientId: APP_CONFIG.clientId,
      refreshToken: token.refresh_token,
    });

    if (res && res.status === 200 && res.data) {
      await Storages.saveUserToken(JSON.stringify(res.data));
    }
  }
}

export async function refreshAuth() {
  const token = await Storages.getUserToken();
  if (token && token.refresh_token) {
    await silentSignIn();
  } else {
    await silentSignIn();
  }
}
