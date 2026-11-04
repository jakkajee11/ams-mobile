import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

export default async function registerForPushNotificationsAsync() {
  let token: string = ''

  // On Android 13+ a notification channel must exist before requesting
  // permission, otherwise the system permission prompt is not shown.
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return token
    }

    try {
      // projectId defaults to Constants.expoConfig.extra.eas.projectId (app.json)
      token = (await Notifications.getExpoPushTokenAsync()).data
    } catch (err) {
      console.warn(['getExpoPushTokenAsync failed', err])
    }
  } else {
    alert('Must use physical device for Push Notifications')
  }

  return token
}
