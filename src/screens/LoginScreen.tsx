import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { Button, Icon, Input, Image, Text } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import Logo from '../components/shared/Logo';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { AuthStackParamList, RootStackParamList } from '../types';
import useAuthApi from '~apis/useAuthApi';
import Storages from '~utils/Storages';
import { APP_CONFIG } from '~constants/Config';
import useAuth from '~hooks/useAuth';
import useUserApi from '~apis/useUserApi';
import Colors from '~constants/Colors';

export default function LoginScreen({
  navigation,
}: StackScreenProps<AuthStackParamList & RootStackParamList, 'Login'>) {
  const { signIn } = useAuthApi();
  const { updateUserNotificationToken } = useUserApi();
  const { isLoggedIn } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState<'flex' | 'none'>('flex');

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
        console.log(['login', res.data]);
        await Storages.saveUserToken(JSON.stringify(res.data));
        await Storages.saveUserName(userName);
        await Storages.saveUserSecret(password);

        // update notification Token
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        if (token) {
          try {
            const tokenRes = await updateUserNotificationToken({
              token,
            });
          } catch {
            console.log('error: updateUserNotificationToken');
          }
        }

        navigation.navigate('Root');
      }
    }
    setLoading(false);
  };

  const hideActionButton = () => {
    setButtonDisplay('none');
  };

  const showActionButton = () => {
    setButtonDisplay('flex');
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', hideActionButton);
    Keyboard.addListener('keyboardDidHide', showActionButton);

    (async function () {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        console.log('User already logged in :)');
        navigation.navigate('Root');
      }
    })();

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', hideActionButton);
      Keyboard.removeListener('keyboardDidHide', showActionButton);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor='#ffb900' /> */}
      <View
        style={{
          flex: 1.8,
          justifyContent: 'flex-end',
          alignSelf: 'center',
          width: '70%',
        }}
      >
        <Logo />
        <Text h4 style={{ textAlign: 'center', color: Colors.darkGrey }}>
          AMS
        </Text>
        <Text style={{ textAlign: 'center', color: Colors.darkGrey }}>
          Asset Management System
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          margin: 5,
          marginTop: 20,
          height: '80%',
          flex: 3,
          justifyContent: 'flex-start',
        }}
      >
        <Input
          placeholder='Username'
          leftIcon={{ type: 'font-awesome-5', name: 'user-alt' }}
          onChangeText={(username: string) => setUserName(username)}
        />
        <Input
          placeholder='Password'
          leftIcon={{ type: 'font-awesome-5', name: 'lock' }}
          secureTextEntry
          onChangeText={(password: string) => setPassword(password)}
        />
        <Button
          icon={<Icon name='login' type='Feather' size={28} color='white' />}
          title='Sign in'
          titleStyle={{ fontWeight: '600', fontSize: 18, marginLeft: 10 }}
          loading={loading}
          onPress={login}
          buttonStyle={{ backgroundColor: Colors.yellow }}
        />

        <View style={{ marginTop: 30 }}>
          <Button
            type='clear'
            title='Forgot Password?'
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
          alignSelf: 'center',
          display: buttonDisplay,
        }}
      >
        <Text>Jungheinrich Thailand</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
    opacity: 0.9,
  },
});
