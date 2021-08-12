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
} from 'react-native-elements';
import useAuthApi from '~apis/useAuthApi';
import { APP_CONFIG } from '~constants/Config';
import Storages from '~utils/Storages';
import Logo from '../components/shared/Logo';

import {
  AuthStackParamList,
  BottomTabParamList,
  JobsParamsList,
  RootStackParamList,
} from '../types';

export default function SettingsScreen({
  route,
  navigation,
}: StackScreenProps<BottomTabParamList, 'Settings'>) {
  const { signOut } = useAuthApi();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    const res = await signOut({ clientId: APP_CONFIG.clientId, token });
    if (res && res.status === 200) {
      await Storages.removeUserToken();
    }
    navigation.navigate('Login');
    setLoading(false);
  };

  useEffect(() => {
    (async function () {
      const accessToken = await Storages.getAccessToken();
      setToken(accessToken);
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar backgroundColor='#ffb900' />
      {/* <View style={{ backgroundColor: '#ffb900' }}>
        <Logo />
      </View> */}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          //alignItems: 'center',
          height: '100%',
          padding: 10,
        }}
      >
        <Text>Version: 1.0.1</Text>
        <Button
          title='Logout'
          type='outline'
          loading={loading}
          onPress={logout}
        />
      </View>
    </View>
  );
}
