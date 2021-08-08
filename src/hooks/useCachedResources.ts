import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import useAuthApi from '~apis/useAuthApi';
import { APP_CONFIG } from '~constants/Config';
import Storages from '~utils/Storages';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { refreshToken } = useAuthApi();

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
        if (userToken) {
          const res = await refreshToken({
            clientId: APP_CONFIG.clientId,
            refreshToken: userToken.refresh_token,
          });
          if (res && res.status === 200 && res.data) {
            await Storages.saveUserToken(res.data);
          }
        } else {
          console.warn('No token found, login required!!!');
        }
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
