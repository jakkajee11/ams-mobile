import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Input, Image } from 'react-native-elements';
import Logo from '../components/shared/Logo';

import { AuthStackParamList } from '../types';

export default function ForgotPasswordScreen({
  navigation,
}: StackScreenProps<AuthStackParamList, 'ForgotPassword'>) {
  const [userName, setUserName] = useState('');

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
          leftIcon={{ type: 'font-awesome-5', name: 'user' }}
          //style={styles}
          onChangeText={(username: string) => setUserName(username)}
        />

        <Button
          icon={<Icon name='send' type='Feather' size={28} color='white' />}
          title='SUBMIT'
          titleStyle={{ fontWeight: '600', fontSize: 18, marginLeft: 10 }}
        />
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
