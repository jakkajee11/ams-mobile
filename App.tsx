import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { FullTheme } from 'react-native-elements';
import { ThemeProvider } from 'react-native-elements';
import Colors from './src/constants/Colors';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotificationsAsync';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const theme = {
  colors: {
    primary: '#363b42', //'#ffb900',
    secondary: '#ffb900', //'#363b42',
    //background: '#ffb900',
  },
  Button: {
    buttonStyle: {
      borderRadius: 8,
    },
  },
  // Icon: {
  //   iconStyle: {
  //     //color: 'white',
  //   },
  // },
  // Text: {
  //   style: {
  //     color: 'white',
  //   },
  // },
  View: {
    backgroundColor: Colors.yellow,
  },
  StatusBar: {
    backgroundColor: Colors.yellow,
  },
  Text: {
    style: {
      fontSize: 14,
    },
  },
};

export default function App() {
  //const navigation = useNavigation();
  const { isLoadingComplete, isUserLoggedIn } = useCachedResources();
  const colorScheme = useColorScheme();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<any>();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const handleNotificationReceived = (response: Notifications.Notification) => {
    console.log(['handleNotificationReceived', response]);
  };
  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    console.log(['handleNotificationResponse', response]);
    //navigation.navigate('Jobs');
    // Todo: navigate to related screen
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener(handleNotificationReceived);

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Navigation
            colorScheme={colorScheme}
            isUserLoggedIn={isUserLoggedIn}
          />
          <StatusBar />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
