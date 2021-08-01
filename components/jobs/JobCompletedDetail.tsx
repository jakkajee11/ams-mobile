import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, Button } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { JobModel } from '../../types/jobs';
import Asset from '../assets/Asset';

interface JobDetailProps {
  data: JobModel;
}

const Label = (text: string) => <Text style={styles.text}>{text}</Text>;

export default function JobCompletedDetail({
  data: { id, jobNumber, dueDate, details, location, subLocation, assets },
}: JobDetailProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: 'white' }}>Detail</Text>
      </View>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text style={styles.box}>Job Number: {jobNumber}</Text>
          <Text style={styles.box}>Due Date: {dueDate}</Text>
        </View>
        <Text style={styles.text}>Location: {location}</Text>
        <Text style={styles.text}>Sub Location: {subLocation}</Text>
        <View>
          <Text style={styles.text}>Detail</Text>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.text}>Assets</Text>
          {assets?.map((asset) => (
            <Asset key={asset.id} data={asset} />
          ))}
        </View>
        <Button title='START' />
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
