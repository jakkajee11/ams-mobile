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

import { RootStackParamList } from '../types';

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#ffb900' />
      <Logo />
      <View
        style={{
          padding: 5,
          margin: 5,
          marginTop: 20,
          height: '30%',
          flex: 0.4,
          justifyContent: 'space-around',
          //backgroundColor: 'white',
        }}
      >
        <Button
          icon={
            <Icon
              name='qr-code-scanner'
              type='MaterialIcons'
              size={60}
              color='white'
            />
          }
          title='Scan asset QR Code'
          titleStyle={{ fontWeight: '600', fontSize: 18, marginLeft: 10 }}
        />

        <Button
          title={
            <View
              style={{
                padding: 3,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon
                name='tasks'
                type='font-awesome-5'
                size={60}
                color='white'
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                }}
              >
                My Jobs
              </Text>
            </View>
          }
          onPress={() => navigation.navigate('Jobs')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb900',
    //alignItems: 'stretch',
    //alignContent: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    opacity: 0.9,
  },
  button: {
    padding: 10,
    height: 150,
  },
});
