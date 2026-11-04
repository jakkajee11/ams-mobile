/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Header from '~components/shared/Header';
import AssetDetailsScreen from '~screens/AssetDetailsScreen';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import JobsScreen from '../screens/JobsScreen';
import ScanQRCodeScreen from '../screens/ScanQRCodeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { BottomTabParamList, JobsParamsList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='MyJobs'
      // tabBarOptions was removed in React Navigation 6+; use screenOptions
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      {/* <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name='MyJobs'
        component={JobsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='tasks' color={color} />,
          // tabBarBadge: 5,
          // tabBarBadgeStyle: { marginLeft: 5, padding: 0 },
          title: 'My Jobs',
        }}
      />
      <BottomTab.Screen
        name='ScanQRCode'
        component={ScanQRCodeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='qrcode' color={color} />,
          title: 'Scan QRCode',
        }}
      />

      {/* <BottomTab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='cog' color={color} />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const JobsStack = createStackNavigator<JobsParamsList>();
function JobsNavigator() {
  return (
    <JobsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.yellow,
        },
        headerTitleStyle: { color: Colors.black, textAlign: 'auto' },
      }}
    >
      <JobsStack.Screen
        name='Jobs'
        component={JobsScreen}
        //options={{ title: 'My Jobs' }}
        options={{ header: () => <Header title='My Jobs' /> }}
      />
      <JobsStack.Screen
        name='JobDetails'
        component={JobDetailsScreen}
        // options={{
        //   headerTitle: 'Job Details',
        //   headerTitleStyle: { color: Colors.black, textAlign: 'auto' },
        //   headerStyle: {
        //     backgroundColor: Colors.yellow,
        //   },
        // }}
        options={{ header: () => <Header title='Job Details' /> }}
      />
      <JobsStack.Screen
        name='AssetDetails'
        component={AssetDetailsScreen}
        options={{
          headerTitle: 'Asset Details',
          headerTitleStyle: { color: Colors.black, textAlign: 'auto' },
          headerStyle: {
            backgroundColor: Colors.yellow,
          },
        }}
      />
    </JobsStack.Navigator>
  );
}
