import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AuthStackParamList } from '../types';

export default function LoginScreen({
  navigation,
}: StackScreenProps<AuthStackParamList, 'Login'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>      
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        // onPress={() => {
        //   setCount(count + 1)
        // }}
      >
        <Text style={styles.linkText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        //style={styles.button}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.linkText}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  button: {
    padding: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'lightgreen',
  },
});
