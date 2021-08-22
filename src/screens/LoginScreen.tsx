import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import {
  Alert,
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
import useAuthApi from '~apis/useAuthApi';
import Storages from '~utils/Storages';
import { APP_CONFIG } from '~constants/Config';
import useAuth from '~hooks/useAuth';

export default function LoginScreen({
  navigation,
}: StackScreenProps<AuthStackParamList & RootStackParamList, 'Login'>) {
  const { signIn } = useAuthApi();
  const { isLoggedIn } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const clientId = APP_CONFIG.clientId;

  const login = async () => {
    setLoading(true);
    if (userName.length === 0 || password.length === 0) {
      Alert.alert('Error', 'Invalid UserName/Password');
    } else {
      // call api to signin
      const res = await signIn({
        clientId,
        userName,
        password,
      });

      if (res && res.status === 200 && res.data) {
        await Storages.saveUserToken(JSON.stringify(res.data));
        await Storages.saveUserName(userName);
        await Storages.saveUserSecret(password);

        navigation.navigate('Root');
      }
    }
    setLoading(false);
  };

  React.useEffect(() => {
    (async function () {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        console.log('User already logged in :)');
        navigation.navigate('Root');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor='#ffb900' /> */}
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
          secureTextEntry
          onChangeText={(password: string) => setPassword(password)}
        />
        <Button
          icon={<Icon name='login' type='Feather' size={28} color='white' />}
          title='Login'
          titleStyle={{ fontWeight: '600', fontSize: 18, marginLeft: 10 }}
          loading={false}
          onPress={login}
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
