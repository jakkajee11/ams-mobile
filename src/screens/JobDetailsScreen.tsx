import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Icon,
  Input,
  Text,
  Tab,
  TabView,
  ListItem,
} from 'react-native-elements';

import {
  AuthStackParamList,
  JobsParamsList,
  RootStackParamList,
} from '../types';
import JobDetail from '~components/jobs/JobDetail';
import baseStyles from '~styles/baseStyles';
import Colors from '~constants/Colors';

export default function JobDetailsScreen({
  route,
  navigation,
}: StackScreenProps<JobsParamsList, 'JobDetails'>) {
  return (
    <>
      {/* <StatusBar /> */}

      <>
        <View style={baseStyles.container}>
          <JobDetail data={route.params} />
        </View>
      </>
      <View style={{ ...baseStyles.buttonGroupBottom, flex: 0.4 }}>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <Icon name='clock' type='font-awesome-5' />
          <Text style={{ textAlign: 'center', marginLeft: 5 }}>
            Time used: 1 hour 30 minutes
          </Text>
        </View>
        <Button title='FINISH' />
        <Button title='SAVE' />
      </View>
    </>
  );
}
