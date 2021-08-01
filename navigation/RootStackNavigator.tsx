import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import JobsScreen from '../screens/JobsScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Jobs' component={BottomTabNavigator} />
      <Stack.Screen name='JobDetails' component={JobDetailsScreen} />
    </Stack.Navigator>
  );
}
