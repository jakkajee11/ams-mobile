import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import {
  Button,
  Icon,
  Input,
  Text,
  Tab,
  TabView,
  ListItem,
} from 'react-native-elements'
import useAuthApi from '~apis/useAuthApi'
import { APP_CONFIG } from '~constants/Config'
import Storages from '~utils/Storages'
import Logo from '../components/shared/Logo'
import Constants from 'expo-constants'

import {
  AuthStackParamList,
  BottomTabParamList,
  JobsParamsList,
  RootStackParamList,
} from '../types'
import baseStyles from '~styles/baseStyles'
import { ProfileModel } from '~types/users'
import useUserApi from '~apis/useUserApi'
import Loading from '~components/shared/Loading'
import * as Notifications from 'expo-notifications'

export default function ProfileScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'MyProfile'>) {
  const { getMyProfile } = useUserApi()
  const { signOut } = useAuthApi()
  const [token, setToken] = useState('')
  const [profile, setProfile] = useState<ProfileModel | null>(null)
  const [loading, setLoading] = useState(false)
  const [pushToken, setPushToken] = useState('')

  const logout = async () => {
    setLoading(true)
    await Storages.removeUserToken()
    navigation.navigate('Auth')
    setLoading(false)
  }

  useEffect(() => {
    ;(async function () {
      // const accessToken = await Storages.getAccessToken();
      // setToken(accessToken);
      setLoading(true)
      const profile = await Storages.getProfile()
      if (!profile) {
        const res = await getMyProfile()

        if (res && res.status === 200) {
          const { id, userName, email, isAdmin, active } = res.data
          const p: ProfileModel = {
            id,
            userName,
            email,
            isAdmin,
            active,
          }

          await Storages.saveUserProfile(JSON.stringify(p))

          setProfile(p)
        }
      } else {
        setProfile(profile)
      }
      //const token = (await Notifications.getExpoPushTokenAsync()).data;
      //setPushToken(token);
      setLoading(false)
    })()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <StatusBar backgroundColor="#ffb900" />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          //alignItems: 'center',
          //height: '100%',
          padding: 10,
        }}
      >
        {loading && <Loading loading={loading} />}
        <View style={{ flex: 0.5, justifyContent: 'space-between' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="user-circle" type="font-awesome-5" size={40} />
            <Text style={{ marginLeft: 15 }}>{profile?.userName}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="email" type="MaterialIcons" size={40} />
            <Text style={{ marginLeft: 15 }}>{profile?.email}</Text>
          </View>
          <Button
            icon={<Icon name="logout" type="AntDesign" />}
            title="  LOGOUT"
            type="outline"
            loading={loading}
            onPress={logout}
          />
        </View>
      </View>
      <View style={{ flex: 0.5 }}>
        <Text style={baseStyles.textCenter}>
          App Version: {Constants.expoConfig?.version}
        </Text>
        <Text style={baseStyles.textCenter}>
          SDK Version: {Constants.expoConfig?.sdkVersion}
        </Text>
        <Text style={baseStyles.textCenter}>
          Device Name: {Constants.deviceName}
        </Text>
        {/* <Text style={baseStyles.textCenter}>Push Token: {pushToken}</Text>
        <Button onPress={getToken} title='Get Token' /> */}
      </View>
      <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Button
            icon={
              <Icon name="home" type="font-awesome-5" size={28} color="white" />
            }
            //title='Forgot Password?'
            onPress={() => navigation.navigate('Home')}
          />
          {/* <Button
            //type='clear'
            icon={
              <Icon name='user' type='font-awesome-5' size={28} color='white' />
            }
            //title='Forgot Password?'
            onPress={() => navigation.navigate('MyProfile')}
          /> */}
        </View>
      </View>
    </View>
  )
}
