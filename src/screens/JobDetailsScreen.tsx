import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
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
} from 'react-native-elements';

import { JobsParamsList } from '../types';
import JobDetail from '~components/jobs/JobDetail';
import baseStyles from '~styles/baseStyles';
import useJobApi from '~apis/useJobApi';
import { JobModel } from '~types/jobs';
import Loading from '~components/shared/Loading';
import { JOB_ASSET_STATUS, JOB_PROGRESS, JOB_STATUS } from '~constants/Status';
import { BarCodeScanningResult } from 'expo-camera';
import ModalCamera from '~components/shared/ModalCamera';

export default function JobDetailsScreen({
  route,
  navigation,
}: StackScreenProps<JobsParamsList, 'JobDetails'>) {
  const [loading, setLoading] = useState(false);
  const { getJob, updateJobStatus, updateJobProgress, updateJobAssetStatus } =
    useJobApi();
  const [jobDetail, setJobDetail] = useState<JobModel>();
  const [showCamera, setShowCamera] = useState(false);
  const [scannedResult, setScannedResult] = useState('');
  const [totalChecked, setTotalChecked] = useState(0);

  const startJob = async () => {
    const res = await updateJobStatus(
      jobDetail?.id ?? '',
      JOB_STATUS.InProgress
    );
    if (res && res.status === 200) {
      Alert.alert('Success', 'Job is started');
      navigation.navigate('Jobs');
    } else {
      Alert.alert('Failed', 'Start job failed');
    }
  };

  const updateProgress = async () => {
    const res = await updateJobProgress(
      jobDetail?.id ?? '',
      jobDetail?.jobProgressId === JOB_PROGRESS.Paused
        ? JOB_PROGRESS.Started
        : JOB_PROGRESS.Paused
    );
    if (res && res.status === 200) {
      Alert.alert('Success', 'Job is saved');
      navigation.navigate('Jobs');
    } else {
      Alert.alert('Failed', 'Save job failed');
    }
  };

  const finishJob = async () => {
    var uncheckedAssets =
      jobDetail?.assets.filter(
        (ja) => ja.jobAssetStatusId === JOB_ASSET_STATUS.NotCheck
      )?.length ?? 0;
    if (uncheckedAssets > 0) {
      Alert.alert(
        'Warning',
        `There ${
          uncheckedAssets > 1 ? 'are' : 'is'
        } ${uncheckedAssets} not yet completed, Are you sure to finish?`,
        [
          {
            text: 'Cancel',
            onPress: () => setLoading(false),
            style: 'cancel',
          },
          { text: 'OK', onPress: doFinishJob },
        ],
        { cancelable: true }
      );
    } else {
      await doFinishJob();
    }
  };

  const doFinishJob = async () => {
    setLoading(true);
    const res = await updateJobProgress(
      jobDetail?.id ?? '',
      jobDetail?.jobProgressId === JOB_PROGRESS.Paused
        ? JOB_PROGRESS.Started
        : JOB_PROGRESS.Paused
    );
    if (res && res.status === 200) {
      Alert.alert('Success', 'Job is saved');
      setLoading(false);
      navigation.navigate('Jobs');
    } else {
      Alert.alert('Failed', 'Save job failed');
      setLoading(false);
    }
  };

  const openCamera = () => setShowCamera(true);
  const closeCamera = () => setShowCamera(false);

  const loadJob = async () => {
    setLoading(true);
    const res = await getJob(route.params.id);

    if (res && res.status === 200 && res.data) {
      setJobDetail(res.data);
    }
    setLoading(false);
  };

  const handleBarCodeScanned = async ({
    type,
    data,
    cornerPoints,
  }: BarCodeScanningResult) => {
    setScannedResult(data);
    closeCamera();
    // check asset in system
    setLoading(true);
    const res = await updateJobAssetStatus({
      jobId: jobDetail?.id ?? '',
      assetId: data,
      status: JOB_ASSET_STATUS.Checked,
    });
    if (res && res.status === 200 && res.data) {
      await loadJob();
    } else {
      Alert.alert('Info', 'Asset not found');
    }
    setLoading(false);
  };

  const checkedItemCount = () =>
    jobDetail?.assets.filter(
      (ja) => ja.jobAssetStatusId === JOB_ASSET_STATUS.Checked
    )?.length ?? 0;

  const itemCount = () => jobDetail?.assets.length ?? 0;

  const jobProgress = () =>
    checkedItemCount() === 0
      ? 0
      : (itemCount() / checkedItemCount()).toFixed(1);

  useEffect(() => {
    (async function () {
      await loadJob();
    })();
  }, []);

  return (
    <ScrollView style={baseStyles.scrollView}>
      {loading && <Loading loading={loading} />}
      <View style={baseStyles.container}>
        {jobDetail && <JobDetail data={jobDetail} />}
      </View>

      <View style={{ ...baseStyles.buttonGroupBottom, flex: 0.4 }}>
        {jobDetail?.jobStatusId === JOB_STATUS.Pending && (
          <Button title='START' onPress={startJob} />
        )}
        {jobDetail?.jobStatusId === JOB_STATUS.InProgress && (
          <Button title={'SCAN ASSET'} onPress={openCamera} />
        )}
        {jobDetail?.jobStatusId === JOB_STATUS.InProgress && (
          <View>
            <Text style={baseStyles.textCenter}>
              Progress {jobProgress()}% ({checkedItemCount()}/{itemCount()}{' '}
              checked)
            </Text>
            <Button title='FINISH' onPress={finishJob} />
          </View>
        )}
        {/* {jobDetail?.jobStatusId === JOB_STATUS.InProgress &&
          jobDetail?.jobProgressId === JOB_PROGRESS.Started && (
            <Button title='FINISH' onPress={finishJob} />
          )} */}
      </View>

      <ModalCamera
        openCamera={openCamera}
        closeCamera={closeCamera}
        showCamera={showCamera}
        onBarCodeScanned={handleBarCodeScanned}
        mode={'scan'}
      />
    </ScrollView>
  );
}
