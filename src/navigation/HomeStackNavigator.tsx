import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '../types'
import HomeScreen from '../screens/HomeScreen'
import ScanQRCodeFoundScreen from '~screens/ScanQRCodeFoundScreen'
import ScanQRCodeNotFoundScreen from '~screens/ScanQRCodeNotFoundScreen'
import ReportAssetScreen from '~screens/ReportAssetScreen'
import Header from '~components/shared/Header'
import ScanQRCodeScreen from '~screens/ScanQRCodeScreen'
import ReportAssetFromAddressScreen from '~screens/ReportAssetFromAddressScreen'
import AssetDetailsScreen from '~screens/AssetDetailsScreen'
import ProfileScreen from '~screens/ProfileScreen'
import SearchSerialNoScreen from '~screens/SearchSerialNoScreen'
import JobDetailsScreen from '~screens/JobDetailsScreen'
import UpdateAssetStatusAndLocationScreen from '~screens/UpdateAssetStatusAndLocationScreen'
import AssetAgingScreen from '~screens/AssetAgingScreen'
import AssetAgingDetailsScreen from '~screens/AssetAgingDetailsScreen'
import AssetAgingListScreen from '~screens/AssetAgingListScreen'

const Stack = createStackNavigator<RootStackParamList>()

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReportAsset"
        component={ReportAssetScreen}
        options={{ header: () => <Header title="Report Asset" /> }}
      />
      <Stack.Screen
        name="ReportAssetFromAddress"
        component={ReportAssetFromAddressScreen}
        options={{ header: () => <Header title="Create Job" /> }}
      />
      <Stack.Screen
        name="StatusAndLocation"
        component={UpdateAssetStatusAndLocationScreen}
        options={{ header: () => <Header title="Status & Location" /> }}
      />
      <Stack.Screen
        name="AssetAging"
        component={AssetAgingScreen}
        options={{ header: () => <Header title="Asset Aging" /> }}
      />
      <Stack.Screen
        name="AssetAgingList"
        component={AssetAgingListScreen}
        options={{ header: () => <Header title="Aging List" /> }}
      />
      <Stack.Screen
        name="AssetAgingDetails"
        component={AssetAgingDetailsScreen}
        options={{ header: () => <Header title="Asset Aging" /> }}
      />
      <Stack.Screen
        name="AssetDetails"
        component={AssetDetailsScreen}
        options={{ header: () => <Header title="Asset Detail" /> }}
      />
      <Stack.Screen
        name="ScanQRCode"
        component={ScanQRCodeScreen}
        options={{ header: () => <Header title="QR CODE" /> }}
      />
      <Stack.Screen
        name="SearchSerialNo"
        component={SearchSerialNoScreen}
        options={{ header: () => <Header title="Search Serial No." /> }}
      />
      <Stack.Screen
        name="ScanQRCodeFound"
        component={ScanQRCodeFoundScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScanQRCodeNotFound"
        component={ScanQRCodeNotFoundScreen}
        options={{ header: () => <Header title="NOT FOUND" /> }}
      />
      <Stack.Screen
        name="MyProfile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetailsScreen}
        options={{ header: () => <Header title="Details" /> }}
      />
    </Stack.Navigator>
  )
}
