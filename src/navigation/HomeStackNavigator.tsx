import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import ScanQRCodeFoundScreen from '~screens/ScanQRCodeFoundScreen';
import ScanQRCodeNotFoundScreen from '~screens/ScanQRCodeNotFoundScreen';
import ReportAssetScreen from '~screens/ReportAssetScreen';
import Header from '~components/shared/Header';
import ScanQRCodeScreen from '~screens/ScanQRCodeScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ReportAsset'
        component={ReportAssetScreen}
        options={{ header: () => <Header title='Report Asset' /> }}
      />
      <Stack.Screen
        name='ScanQRCode'
        component={ScanQRCodeScreen}
        options={{ header: () => <Header title='QR CODE' /> }}
      />
      <Stack.Screen
        name='ScanQRCodeFound'
        component={ScanQRCodeFoundScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ScanQRCodeNotFound'
        component={ScanQRCodeNotFoundScreen}
        options={{ header: () => <Header title='NOT FOUND' /> }}
      />
    </Stack.Navigator>
  );
}
