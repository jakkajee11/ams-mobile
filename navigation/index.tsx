/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import JobsScreen from '../screens/JobsScreen';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import RootStackNavigator from './RootStackNavigator';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Auth'
    >
      <Stack.Screen name='Auth' component={AuthNavigator} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Jobs' component={BottomTabNavigator} />
      <Stack.Screen name='JobDetails' component={JobDetailsScreen} />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
