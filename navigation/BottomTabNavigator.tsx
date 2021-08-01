/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import JobAssetDetailsScreen from '../screens/JobAssetDetailsScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import JobsScreen from '../screens/JobsScreen';
import ScanQRCodeScreen from '../screens/ScanQRCodeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  BottomTabParamList,
  JobsParamsList,
  TabOneParamList,
  TabTwoParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='MyJobs'
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='MyJobs'
        component={JobsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='tasks' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='ScanQRCode'
        component={ScanQRCodeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='qrcode' color={color} />,
        }}
      />

      <BottomTab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='cog' color={color} />,
        }}
      />
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
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name='TabOneScreen'
        component={TabOneScreen}
        options={{
          headerTitle: 'Tab One Title',
          //headerBackTitleStyle: { backgroundColor: Colors.white },
          headerTitleStyle: { color: Colors.white },
          headerStyle: { backgroundColor: Colors.black },
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name='TabTwoScreen'
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}

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
      <JobsStack.Screen name='Jobs' component={JobsScreen} />
      <JobsStack.Screen
        name='JobDetails'
        component={JobDetailsScreen}
        options={{
          headerTitle: 'Job Details',
          headerTitleStyle: { color: Colors.black, textAlign: 'auto' },
          headerStyle: {
            backgroundColor: Colors.yellow,
          },
        }}
      />
      <JobsStack.Screen
        name='JobAssetDetails'
        component={JobAssetDetailsScreen}
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
