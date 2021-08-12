import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import {
  Button,
  Icon,
  Input,
  Text,
  Tab,
  TabView,
  ListItem,
} from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import Logo from '../components/shared/Logo';
import Job from '../components/jobs/Job';

import {
  AuthStackParamList,
  JobsParamsList,
  RootStackParamList,
} from '../types';
import { JobModel } from '../types/jobs';

export default function JobsScreen({
  navigation,
}: StackScreenProps<JobsParamsList, 'Jobs'>) {
  const [index, setIndex] = useState(0);

  const pendingJobs = [
    {
      id: '1',
      jobNumber: 'jhth-p01',
      dueDate: '2021-07-01',
      assets: [
        {
          key: '1',
          id: '1',
          assetId: 'a01',
          assetStatusName: 'New',
          createdAt: '2021-01-01',
        },
        {
          key: '2',
          id: '2',
          assetId: 'a02',
          assetStatusName: 'New',
          createdAt: '2021-01-01',
        },
        {
          key: '3',
          id: '3',
          assetId: 'a03',
          assetStatusName: 'In Stock',
          createdAt: '2021-01-01',
        },
      ],
    },
    {
      id: '2',
      jobNumber: 'jhth-p02',
      dueDate: '2021-07-02',
    },
    {
      id: '3',
      jobNumber: 'jhth-p03',
      dueDate: '2021-07-03',
    },
  ];

  const workingJobs = [
    {
      id: '1',
      jobNumber: 'jhth-w01',
      dueDate: '2021-07-01',
    },
    {
      id: '2',
      jobNumber: 'jhth-w02',
      dueDate: '2021-07-02',
    },
    {
      id: '3',
      jobNumber: 'jhth-w03',
      dueDate: '2021-07-03',
    },
    {
      id: '4',
      jobNumber: 'jhth-w04',
      dueDate: '2021-07-04',
    },
  ];

  const completedJobs = [
    {
      id: '1',
      jobNumber: 'jhth-c01',
      dueDate: '2021-07-01',
    },
    {
      id: '2',
      jobNumber: 'jhth-c02',
      dueDate: '2021-07-02',
    },
    {
      id: '3',
      jobNumber: 'jhth-c03',
      dueDate: '2021-07-03',
    },
    {
      id: '4',
      jobNumber: 'jhth-c04',
      dueDate: '2021-07-04',
    },
    {
      id: '5',
      jobNumber: 'jhth-c05',
      dueDate: '2021-07-05',
    },
  ];

  const PendingTitle = (
    <Text style={styles.title}>
      Pending{'\n'}
      (10)
    </Text>
  );
  const WorkingTitle = (
    <Text style={styles.title}>
      Working{'\n'}
      (20)
    </Text>
  );

  const CompletedTitle = (
    <Text style={styles.title}>
      Completed{'\n'}
      (30)
    </Text>
  );

  const handleJobItemPress = (job: JobModel) => {
    console.log(['handleJobItemPress', job]);
    navigation.navigate('JobDetails', job);
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor='#ffb900' /> */}
      {/* <View style={{ backgroundColor: '#ffb900' }}>
        <Logo />
      </View> */}
      <View style={{ padding: 0, height: '100%' }}>
        <Tab value={index} onChange={setIndex} variant={'primary'}>
          <Tab.Item
            title={PendingTitle}
            //buttonStyle={{ backgroundColor: '#363b42' }}
            titleStyle={{ color: 'white', fontSize: 8 }}
          />
          <Tab.Item
            title={WorkingTitle}
            //buttonStyle={{ backgroundColor: '#363b42' }}
            titleStyle={{ color: 'white', fontSize: 8 }}
          />
          <Tab.Item
            title={CompletedTitle}
            //buttonStyle={{ backgroundColor: '#363b42' }}
            titleStyle={{ color: 'white', fontSize: 8 }}
          />
        </Tab>

        <TabView value={index} onChange={setIndex}>
          <TabView.Item style={styles.tabViewItem}>
            <View>
              {pendingJobs.map((job) => (
                <Job
                  key={job.id}
                  data={job}
                  onPress={(job: JobModel) => handleJobItemPress(job)}
                />
              ))}
            </View>
          </TabView.Item>
          <TabView.Item style={styles.tabViewItem}>
            <View>
              {workingJobs.map((job) => (
                <Job
                  key={job.id}
                  data={job}
                  onPress={(job: JobModel) => handleJobItemPress(job)}
                />
              ))}
            </View>
          </TabView.Item>
          <TabView.Item style={styles.tabViewItem}>
            <View>
              {completedJobs.map((job) => (
                <Job
                  key={job.id}
                  data={job}
                  onPress={(job: JobModel) => handleJobItemPress(job)}
                />
              ))}
            </View>
          </TabView.Item>
        </TabView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#ffb900',
    //alignItems: 'stretch',
    //alignContent: 'flex-start',
    //justifyContent: 'flex-start',
    padding: 0,
    opacity: 0.9,
  },
  button: {
    padding: 10,
    height: 150,
  },
  title: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  tabViewItem: {
    width: '100%',
  },
});
