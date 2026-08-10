import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthStackParamList } from '../types';
import { Header } from '@rn-vui/themed';
import Colors from '~constants/Colors';
import Logo from '~components/shared/Logo';
//import Header from '~components/shared/Header';

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        //header: () => <Header backgroundColor={Colors.yellow} />,
        headerShown: true,
        headerStyle: { backgroundColor: Colors.yellow },
        headerTitle: () => <Logo />,
      }}
    >
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
