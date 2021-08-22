import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
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
import Job from '../components/jobs/Job';

import {
  AuthStackParamList,
  JobsParamsList,
  RootStackParamList,
} from '../types';
import { JobModel, JobQuery } from '../types/jobs';
import useJobApi from '~apis/useJobApi';
import { JOB_STATUS } from '~constants/Status';
import Loading from '~components/shared/Loading';

export default function JobsScreen({
  navigation,
}: StackScreenProps<JobsParamsList, 'Jobs'>) {
  const { getPendingJobs, getWorkingJobs, getCompletedJobs } = useJobApi();
  const [index, setIndex] = useState(0);
  // const [pendingJobs, setPendingJobs] = useState<JobModel[]>([]);
  // const [workingJobs, setWorkingJobs] = useState<JobModel[]>([]);
  // const [completedJobs, setCompletedJobs] = useState<JobModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<{ [key: string]: JobModel[] }>({});

  const PendingTitle = (
    <Text style={styles.title}>
      Pending{'\n'}({jobs[JOB_STATUS.Pending]?.length ?? 0})
    </Text>
  );
  const WorkingTitle = (
    <Text style={styles.title}>
      Working{'\n'}({jobs[JOB_STATUS.InProgress]?.length ?? 0})
    </Text>
  );

  const CompletedTitle = (
    <Text style={styles.title}>
      Completed{'\n'}({jobs[JOB_STATUS.Completed]?.length ?? 0})
    </Text>
  );

  const handleJobItemPress = (job: JobModel) => {
    navigation.navigate('JobDetails', job);
  };

  const prepareData = async () => {
    setLoading(true);
    const query: JobQuery = {
      page: 0, // no pagination
      size: 10,
      status: 0,
      startDate: '2021-07-01',
      endDate: '2021-12-31',
    };
    const [pending, working, completed] = await Promise.all([
      getPendingJobs({ ...query, status: JOB_STATUS.Pending }),
      getWorkingJobs({ ...query, status: JOB_STATUS.InProgress }),
      getCompletedJobs({ ...query, status: JOB_STATUS.Completed }),
    ]);

    let myJobs: { [key: number]: JobModel[] } = {};

    if (pending && pending.status === 200 && pending.data) {
      //setPendingJobs(pending.data);
      myJobs[JOB_STATUS.Pending] = pending.data.records;
    }
    if (working && working.status === 200 && working.data) {
      //setWorkingJobs(working.data);
      myJobs[JOB_STATUS.InProgress] = working.data.records;
    }
    if (completed && completed.status === 200 && completed.data) {
      //setCompletedJobs(completed.data);
      myJobs[JOB_STATUS.Completed] = completed.data.records;
    }

    setJobs(myJobs);
    setLoading(false);
  };

  useEffect(() => {
    prepareData();
  }, []);

  return (
    <View style={styles.container}>
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
              {loading && <Loading loading={loading} />}
              {jobs[JOB_STATUS.Pending]?.map((job) => (
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
              {jobs[JOB_STATUS.InProgress]?.map((job) => (
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
              {jobs[JOB_STATUS.Completed]?.map((job) => (
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
