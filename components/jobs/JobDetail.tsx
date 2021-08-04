import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, Button } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { JOB_STATUS } from '../../constants/Status';
import { JobModel } from '../../types/jobs';
import Asset from '../assets/Asset';
import JobAsset from './JobAsset';

interface JobDetailProps {
  data: JobModel;
}

const Label = (text: string) => <Text style={styles.text}>{text}</Text>;

export default function JobDetail({
  data: {
    id,
    jobNumber,
    jobStatusId,
    dueDate,
    details,
    location,
    subLocation,
    assets,
    createdAt,
  },
}: JobDetailProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: 'white' }}>Detail (Pending)</Text>
      </View>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text style={styles.box}>Job Number: {jobNumber}</Text>
          <Text style={styles.box}>Created at: {createdAt}</Text>
        </View>
        <Text style={styles.text}>Location: {location}</Text>
        <Text style={styles.text}>Sub Location: {subLocation}</Text>
        <View>
          <Text style={styles.text}>Detail</Text>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.text}>Assets</Text>
          {assets?.map((asset) => (
            <JobAsset
              key={asset.id}
              data={asset}
              onPress={() => navigation.navigate('JobAssetDetails', asset)}
            />
          ))}
        </View>
      </View>

      <View style={{ flex: 0.5, justifyContent: 'space-around', padding: 5 }}>
        {jobStatusId === JOB_STATUS.Pending && <Button title='START' />}
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          <View
            style={{
              flex: 0.3,
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <Icon name='clock' type='font-awesome-5' />
            <Text style={{ textAlign: 'center', marginLeft: 5 }}>
              Time used: 1 hour 30 minutes
            </Text>
          </View>
          <Button title='FINISH' />
          <Button title='SAVE' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 0.5,
    justifyContent: 'flex-start',
    fontSize: 12,
  },
  box100: {
    flex: 1,
    justifyContent: 'flex-start',
    fontSize: 12,
  },
  container: {
    padding: 0,
    opacity: 0.9,
    flex: 1,
  },
  header: {
    padding: 10,
    backgroundColor: Colors.background.black,
    alignItems: 'center',
  },
  content: {
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 12,
  },
});
