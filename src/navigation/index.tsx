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
import Header from '~components/shared/Header';
import JobsScreen from '~screens/JobsScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import JobStackNavigator from './JobStackNavigator';

export default function Navigation({
  colorScheme,
  isUserLoggedIn,
}: {
  colorScheme: ColorSchemeName;
  isUserLoggedIn: boolean;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <AppNavigator isLoggedIn={isUserLoggedIn} />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
//const Stack = createStackNavigator<AppStackParamList>();
const Stack = createStackNavigator();

interface AppNavigatorProps {
  isLoggedIn: boolean;
}

function AppNavigator({ isLoggedIn }: AppNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? 'Root' : 'Auth'}
    >
      <Stack.Screen name='Auth' component={AuthNavigator} />
      <Stack.Screen name='Root' component={RootNavigator} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Main'
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='MyJobs'
        component={JobStackNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
