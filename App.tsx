import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Notifications from 'expo-notifications'
import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'
import { ThemeProvider } from '@rn-vui/themed'
import { AppContext, NotifyContext } from './src/contexts/AppContext'
import Colors from './src/constants/Colors'
import registerForPushNotificationsAsync from './src/utils/registerForPushNotificationsAsync'
import { RootSiblingParent } from 'react-native-root-siblings'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldShowBadge: true,
  }),
})

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
}

export default function App() {
  //const navigation = useNavigation();
  const { isLoadingComplete, isUserLoggedIn } = useCachedResources()
  const colorScheme = useColorScheme()
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<any>()
  const [notiCount, setNotiCount] = useState(0)
  const notificationListener = useRef<any>(null)
  const responseListener = useRef<any>(null)

  const handleNotificationReceived = (response: Notifications.Notification) => {
    console.log(['handleNotificationReceived', response])
    //alert(`noti received: ${notiCount}`);
    setNotiCount(notiCount + 1)
  }
  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    console.log(['handleNotificationResponse', response])
    //navigation.navigate('Jobs');
    // Todo: navigate to related screen
  }

  useEffect(() => {
    
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token as string)
    })

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener(handleNotificationReceived)

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme} useDark={colorScheme === 'dark'}>
          <RootSiblingParent>
            <AppContext.Provider value={{ notiCount }}>
              <Navigation
                colorScheme={colorScheme}
                isUserLoggedIn={isUserLoggedIn}
              />
            </AppContext.Provider>
            <StatusBar />
          </RootSiblingParent>
        </ThemeProvider>
      </SafeAreaProvider>
    )
  }
}
