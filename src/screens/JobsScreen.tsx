import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Icon,
  Input,
  Text,
  Tab,
  TabView,
  ListItem,
} from '@rn-vui/themed';
import Job from '../components/jobs/Job';

import {
  AuthStackParamList,
  JobsParamsList,
  RootStackParamList,
} from '../types';
import { JobModel, JobQuery } from '../types/jobs';
import useJobApi from '~apis/useJobApi';
import { JOB_STATUS } from '~constants/Status';
import { useIsFocused } from '@react-navigation/native';
import Colors from '~constants/Colors';
import Toast from 'react-native-root-toast';
import JobItem from '~components/jobs/JobItem';

export default function JobsScreen({
  navigation,
}: StackScreenProps<JobsParamsList, 'Jobs'>) {
  const { getPendingJobs, getWorkingJobs, getFinishedJobs, getCompletedJobs } =
    useJobApi();
  const [index, setIndex] = useState(0);
  // const [pendingJobs, setPendingJobs] = useState<JobModel[]>([]);
  // const [workingJobs, setWorkingJobs] = useState<JobModel[]>([]);
  // const [completedJobs, setCompletedJobs] = useState<JobModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<{ [key: string]: JobModel[] }>({});
  const isFocused = useIsFocused();

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
      Finished{'\n'}({jobs[JOB_STATUS.Completed]?.length ?? 0})
    </Text>
  );

  const showJobDetails = (job: JobModel) => {
    navigation.navigate('JobDetails', job);
  };

  const prepareData = async () => {
    setLoading(true);
    const query: JobQuery = {
      page: 0, // no pagination
      size: 10,
      status: 0,
      //startDate: '2021-07-01',
      //endDate: '2021-12-31',
    };
    // const [pending, working, finished, completed] = await Promise.all([
    //   getPendingJobs({ ...query, status: JOB_STATUS.Pending }),
    //   getWorkingJobs({ ...query, status: JOB_STATUS.InProgress }),
    //   getFinishedJobs({ ...query, status: JOB_STATUS.Finished }),
    //   getCompletedJobs({ ...query, status: JOB_STATUS.Completed }),
    // ]);
    const [pending, working, finished] = await Promise.all([
      getPendingJobs({ ...query, status: JOB_STATUS.Pending }),
      getWorkingJobs({ ...query, status: JOB_STATUS.InProgress }),
      getFinishedJobs({ ...query, status: JOB_STATUS.Finished }),
    ]);

    let myJobs: { [key: number]: JobModel[] } = {
      [JOB_STATUS.Completed]: [],
    };

    if (pending && pending.status === 200 && pending.data) {
      myJobs[JOB_STATUS.Pending] = pending.data.records;
    } else {
      Toast.show("You don't have permission, please contact administrator", {
        position: Toast.positions.CENTER,
        textColor: Colors.red,
        backgroundColor: Colors.yellow,
      });
    }
    if (working && working.status === 200 && working.data) {
      myJobs[JOB_STATUS.InProgress] = working.data.records;
    }
    if (finished && finished.status === 200 && finished.data) {
      myJobs[JOB_STATUS.Completed] = [
        ...myJobs[JOB_STATUS.Completed],
        ...finished.data.records,
      ];
    }
    // if (completed && completed.status === 200 && completed.data) {
    //   myJobs[JOB_STATUS.Completed] = [
    //     ...myJobs[JOB_STATUS.Completed],
    //     ...completed.data.records,
    //   ];
    // }

    setJobs(myJobs);
    setLoading(false);
  };

  // useEffect(() => {
  //   if (isFocused) prepareData();
  // }, [isFocused]);
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
        {/* <ScrollView
          //contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={prepareData}
              colors={[Colors.yellow]}
            />
          }
        > */}
        <TabView value={index} onChange={setIndex}>
          <TabView.Item style={styles.tabViewItem}>
            <View>
              {jobs[JOB_STATUS.Pending] && (
                <JobItem
                  data={jobs[JOB_STATUS.Pending]}
                  onPress={(job: JobModel) => showJobDetails(job)}
                  loading={loading}
                  onRefresh={prepareData}
                />
              )}
            </View>
          </TabView.Item>
          <TabView.Item style={styles.tabViewItem}>
            <View>
              {jobs[JOB_STATUS.InProgress] && (
                <JobItem
                  data={jobs[JOB_STATUS.InProgress]}
                  onPress={(job: JobModel) => showJobDetails(job)}
                  loading={loading}
                  onRefresh={prepareData}
                />
              )}
            </View>
          </TabView.Item>
          <TabView.Item style={styles.tabViewItem}>
            <View>
              {jobs[JOB_STATUS.Completed] && (
                <JobItem
                  data={jobs[JOB_STATUS.Completed]}
                  onPress={(job: JobModel) => showJobDetails(job)}
                  loading={loading}
                  onRefresh={prepareData}
                />
              )}
            </View>
          </TabView.Item>
        </TabView>
        {/* </ScrollView> */}
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
