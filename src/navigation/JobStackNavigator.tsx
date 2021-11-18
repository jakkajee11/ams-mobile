import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import JobsScreen from '../screens/JobsScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import Header from '~components/shared/Header';
import AssetDetailsScreen from '~screens/AssetDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function JobStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Jobs'
        component={JobsScreen}
        options={{
          headerShown: true,
          header: () => <Header title='My Jobs' />,
        }}
      />
      <Stack.Screen
        name='JobDetails'
        component={JobDetailsScreen}
        options={{
          headerShown: true,
          header: () => <Header title='Job Details' />,
        }}
      />
      <Stack.Screen
        name='AssetDetails'
        component={AssetDetailsScreen}
        options={{
          headerShown: true,
          header: () => <Header title='Asset Detail' />,
        }}
      />
    </Stack.Navigator>
  );
}
