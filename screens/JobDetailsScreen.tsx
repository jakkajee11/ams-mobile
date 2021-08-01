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
  JobsParamsList,
  RootStackParamList,
} from '../types';
import JobDetail from '../components/jobs/JobDetail';

export default function JobDetailsScreen({
  route,
  navigation,
}: StackScreenProps<JobsParamsList, 'JobDetails'>) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#ffb900' />
      {/* <View style={{ backgroundColor: '#ffb900' }}>
        <Logo />
      </View> */}
      <View style={{ padding: 0, height: '100%' }}>
        <JobDetail data={route.params} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    opacity: 0.9,
  },
  button: {
    padding: 10,
    height: 150,
  },
  title: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  tabViewItem: {
    width: '100%',
  },
});
