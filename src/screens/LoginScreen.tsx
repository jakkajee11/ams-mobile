import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Icon, Input, Image } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import Logo from '../components/shared/Logo';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { AuthStackParamList, RootStackParamList } from '../types';

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;

const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

export default function LoginScreen({
  navigation,
}: StackScreenProps<AuthStackParamList & RootStackParamList, 'Login'>) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const discovery = AuthSession.useAutoDiscovery('https://localhost:5100');

  // Create and load an auth request
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'ams-web',
      redirectUri,
      scopes: ['openid', 'profile', 'email', 'offline_access', 'api'],
    },
    discovery
  );

  //console.log()

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#ffb900' />
      <Logo />
      <View
        style={{
          padding: 5,
          margin: 5,
          marginTop: 20,
          height: '80%',
          //backgroundColor: 'white',
          flex: 1,
          justifyContent: 'flex-start',
        }}
      >
        <Input
          placeholder='Username/Email'
          leftIcon={{ type: 'font-awesome-5', name: 'user-alt' }}
          //style={styles}
          onChangeText={(username: string) => setUserName(username)}
        />
        <Input
          placeholder='Password'
          leftIcon={{ type: 'font-awesome-5', name: 'lock' }}
          //style={styles}
          onChangeText={(password: string) => setPassword(password)}
        />
        <Button
          icon={<Icon name='login' type='Feather' size={28} color='white' />}
          title='Login'
          titleStyle={{ fontWeight: '600', fontSize: 18, marginLeft: 10 }}
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          icon={<Icon name='login' type='Feather' size={28} color='white' />}
          title='OAUTH'
          titleStyle={{ fontWeight: '600', fontSize: 18, marginLeft: 10 }}
          onPress={() => promptAsync({ useProxy })}
        />
        <View style={{ marginTop: 30 }}>
          <Button
            type='clear'
            title='Forgot Password?'
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb900',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
    opacity: 0.9,
  },
});
