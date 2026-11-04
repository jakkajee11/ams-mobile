import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import {
  Button,
  Icon,
  Input,
  Text,
  Tab,
  TabView,
  ListItem,
} from '@rn-vui/themed';
import useAuthApi from '~apis/useAuthApi';
import { APP_CONFIG } from '~constants/Config';
import Storages from '~utils/Storages';
import Logo from '../components/shared/Logo';
import Constants from 'expo-constants';

import {
  AuthStackParamList,
  BottomTabParamList,
  JobsParamsList,
  RootStackParamList,
} from '../types';
import baseStyles from '~styles/baseStyles';
import { resetToRoute } from '~utils/navigation';

export default function SettingsScreen({
  route,
  navigation,
}: StackScreenProps<BottomTabParamList, 'Settings'>) {
  const { signOut } = useAuthApi();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    // console.log(['token', token]);
    // const res = await signOut({ clientId: APP_CONFIG.clientId, token });
    // console.log(['logout', res.status]);
    // if (res && res.status === 200) {
    //   await Storages.removeUserToken();
    // }
    try {
      await Storages.removeUserToken();
    } finally {
      setLoading(false);
      // reset so "back" can't return to authenticated screens
      resetToRoute(navigation, 'Auth');
    }
  };

  useEffect(() => {
    (async function () {
      const accessToken = await Storages.getAccessToken();
      setToken(accessToken);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        alignContent: 'center',
        //alignSelf: 'center',
        //backgroundColor: 'red',
      }}
    >
      <StatusBar style="light" />
      {/* <View style={{ backgroundColor: '#ffb900' }}>
        <Logo />
      </View> */}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          //alignItems: 'center',
          //height: '100%',
          padding: 10,
        }}
      >
        <Text style={baseStyles.textCenter}>
          App Version: {Constants.expoConfig?.version}
        </Text>
        <Text style={baseStyles.textCenter}>
          SDK Version: {Constants.expoConfig?.sdkVersion}
        </Text>
        <Text style={baseStyles.textCenter}>
          Device Name: {Constants.deviceName}
        </Text>
        <Button
          title='LOGOUT'
          type='outline'
          loading={loading}
          onPress={logout}
        />
      </View>
    </View>
  );
}
