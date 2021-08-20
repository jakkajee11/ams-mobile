import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import useAuthApi from '~apis/useAuthApi';
import { APP_CONFIG } from '~constants/Config';
import Storages from '~utils/Storages';
import useAuth from './useAuth';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  const { signIn, refreshToken } = useAuthApi();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        const userToken = await Storages.getUserToken();
        //console.log(['userToken', userToken]);
        if (userToken) {
          const res = await refreshToken({
            clientId: APP_CONFIG.clientId,
            refreshToken: userToken.refresh_token,
          });
          //console.log(['refresh', res.status]);
          if (res && res.status === 200 && res.data) {
            await Storages.saveUserToken(JSON.stringify(res.data));
          }
          // refresh token failed
          // silent signin user
          if (res && res.status === 203) {
            const userName = await Storages.getString('@__ui$');
            const password = await Storages.getString('@__us$');
            if (
              userName &&
              userName.length > 0 &&
              password &&
              password.length > 0
            ) {
              const signInResult = await signIn({
                clientId: APP_CONFIG.clientId,
                userName,
                password,
              });
              if (
                signInResult &&
                signInResult.status === 200 &&
                signInResult.data
              ) {
                await Storages.saveUserToken(JSON.stringify(signInResult.data));
              }
            }
          }
        } else {
          console.warn('No token found, login required!!!');
        }
        setIsUserLoggedIn(userToken && !!userToken.access_token);
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return {
    isLoadingComplete,
    isUserLoggedIn,
  };
}
