import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, Button } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { JobAssetModel, JobModel } from '../../types/jobs';
import Asset from '../assets/Asset';
import JobAsset from './JobAsset';

interface JobAssetDetailProps {
  data: JobAssetModel;
}

export default function JobAssetDetail({
  data: { id, jobAssetStatusName, assetId },
}: JobAssetDetailProps) {
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
          <Text style={styles.box}>Job Number: {id}</Text>
          <Text style={styles.box}>Status: {jobAssetStatusName}</Text>
        </View>
        {/* <Text style={styles.text}>Location: {location}</Text>
        <Text style={styles.text}>Sub Location: {subLocation}</Text> */}
        <View>
          <Text style={styles.text}>Detail</Text>
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
