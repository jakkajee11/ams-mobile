import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Input, Text } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import useUserApi from '~apis/useUserApi';
import Colors from '~constants/Colors';
import Logo from '../components/shared/Logo';

import { AuthStackParamList } from '../types';

export default function ForgotPasswordScreen({
  navigation,
}: StackScreenProps<AuthStackParamList, 'ForgotPassword'>) {
  const { resetPassword } = useUserApi();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState<'flex' | 'none'>('flex');

  const isEmail = () => {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    return regex.test(email);
    // console.log(['res', res, email]);
    // return res;
  };
  const passwordReset = async () => {
    setLoading(true);
    if (email.length === 0) {
      //alert('Please input email');
      Toast.show('Email is required');
    } else {
      // call api to signin
      const res = await resetPassword(email);

      if (res && res.status === 200) {
        //alert(`New password has been sent to ${email}`);
        Toast.show(`New password has been sent to ${email}`);
      } else {
        //alert('Reset password failed');
        Toast.show(
          'Reset password failed, please ensure you put the correct email address',
          {
            textColor: Colors.red,
            backgroundColor: Colors.yellow,
          }
        );
      }
    }
  };

  const hideActionButton = () => {
    setButtonDisplay('none');
  };

  const showActionButton = () => {
    setButtonDisplay('flex');
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', hideActionButton);
    Keyboard.addListener('keyboardDidHide', showActionButton);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', hideActionButton);
      Keyboard.removeListener('keyboardDidHide', showActionButton);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor='#ffb900' /> */}
      {/* <View
        style={{
          flex: 2,
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
      </View> */}
      <View
        style={{
          padding: 5,
          margin: 5,
          marginTop: 20,
          height: '80%',
          //backgroundColor: 'white',
          flex: 3,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            //flex: 2,
            justifyContent: 'flex-end',
            alignSelf: 'center',
            width: '80%',
          }}
        >
          <Logo />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 10,
              color: Colors.darkGrey,
            }}
          >
            Forgot your password?
          </Text>
        </View>

        <View
          style={{ borderColor: Colors.lightGrey, borderWidth: 1, padding: 10 }}
        >
          <Text style={{ marginBottom: 10, fontSize: 12 }}>
            Enter your e-mail address and we'll send you a link to reset your
            password
          </Text>
          <Input
            placeholder='E-mail Address'
            leftIcon={{ type: 'feather', name: 'mail' }}
            //style={styles}
            textContentType='emailAddress'
            onChangeText={(email: string) => setEmail(email)}
          />

          <Button
            //icon={<Icon name='send' type='Feather' size={28} color='white' />}
            title='Reset Password'
            titleStyle={{
              fontWeight: '600',
              fontSize: 18,
              color: Colors.black,
              //marginLeft: 10,
            }}
            buttonStyle={{ backgroundColor: Colors.yellow }}
            onPress={passwordReset}
            disabled={!isEmail()}
          />
          <Button
            type='clear'
            title='Back to login'
            onPress={() => navigation.navigate('Login')}
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
    padding: 5,
    opacity: 0.9,
  },
});
