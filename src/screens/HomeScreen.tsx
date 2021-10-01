import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import useJobApi from '~apis/useJobApi';
import Colors from '~constants/Colors';
import { JOB_STATUS } from '~constants/Status';
import Logo from '../components/shared/Logo';

import { RootStackParamList } from '../types';

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'Home'>) {
  // const { getJobsCount } = useJobApi();
  // const [loading, setLoading] = useState(false);
  // const [jobPendingCount, setJobPendingCount] = useState(0);

  // useEffect(() => {
  //   (async function () {
  //     setLoading(true);
  //     const res = await getJobsCount({});
  //     console.log(['res', res.status, res.data]);
  //     if (res && res.status === 200 && res.data) {
  //       if (res.data[JOB_STATUS.Pending])
  //         setJobPendingCount(res.data[JOB_STATUS.Pending]);
  //     }
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.yellow} />
      <Logo />
      <View
        style={{
          padding: 5,
          margin: 5,
          marginTop: 20,
          height: '30%',
          flex: 0.7,
          justifyContent: 'space-around',
        }}
      >
        <Button
          title={
            <View
              style={{
                padding: 3,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon
                name='qr-code-scanner'
                type='MaterialIcons'
                size={60}
                color='white'
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                }}
              >
                Scan QR Code
              </Text>
            </View>
          }
          onPress={() => navigation.navigate('ScanQRCode')}
        />

        <Button
          title={
            <View
              style={{
                padding: 3,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon
                name='tasks'
                type='font-awesome-5'
                size={60}
                color='white'
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                }}
              >
                {/* My Jobs {jobPendingCount > 0 ? `( ${jobPendingCount} )` : ''} */}
                My Jobs
              </Text>
            </View>
          }
          onPress={() => navigation.navigate('Jobs')}
          //loading={loading}
        />

        <Button
          title={
            <View
              style={{
                padding: 3,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon
                name='search'
                type='font-awesome-5'
                size={60}
                color='white'
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                }}
              >
                Report Asset
              </Text>
            </View>
          }
          onPress={() => navigation.navigate('ReportAsset')}
        />

        <Button
          title={
            <View
              style={{
                padding: 3,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon name='plus' type='feather' size={60} color='white' />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                }}
              >
                Create Job
              </Text>
            </View>
          }
          onPress={() => navigation.navigate('ReportAssetFromAddress')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    padding: 10,
    opacity: 0.9,
  },
  button: {
    padding: 10,
    height: 150,
  },
});
