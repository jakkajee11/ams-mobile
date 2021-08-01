import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
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
        <Button title='Logout' type='outline' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    opacity: 0.9,
  },
});
