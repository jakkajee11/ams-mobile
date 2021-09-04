import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { JobsParamsList } from '../types';
import JobAssetDetail from '../components/jobs/JobAssetDetail';
import baseStyles from '~styles/baseStyles';

export default function JobAssetDetailsScreen({
  route,
  navigation,
}: StackScreenProps<JobsParamsList, 'JobAssetDetails'>) {
  return (
    <View style={baseStyles.container}>
      <StatusBar backgroundColor='#ffb900' />
      {/* <View style={{ backgroundColor: '#ffb900' }}>
        <Logo />
      </View> */}
      <View style={{ padding: 0, height: '100%' }}>
        <JobAssetDetail data={route.params} />
      </View>
    </View>
  );
}
