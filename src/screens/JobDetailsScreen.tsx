import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Button,
  Icon,
  Input,
  Text,
  Tab,
  TabView,
  ListItem,
} from 'react-native-elements'

import { JobsParamsList } from '../types'
import JobDetail from '~components/jobs/JobDetail'
import baseStyles from '~styles/baseStyles'
import useJobApi from '~apis/useJobApi'
import { JobModel } from '~types/jobs'
import Loading from '~components/shared/Loading'
import { JOB_ASSET_STATUS, JOB_PROGRESS, JOB_STATUS } from '~constants/Status'
import { BarcodeScanningResult } from 'expo-camera'
import ModalCamera from '~components/shared/ModalCamera'
import Toast from 'react-native-root-toast'
import Colors from '~constants/Colors'

export default function JobDetailsScreen({
  route,
  navigation,
}: StackScreenProps<JobsParamsList, 'JobDetails'>) {
  const [loading, setLoading] = useState(false)
  const { getJob, updateJobStatus, updateJobProgress, updateJobAssetStatus } =
    useJobApi()
  const [jobDetail, setJobDetail] = useState<JobModel>()
  const [showCamera, setShowCamera] = useState(false)
  const [scannedResult, setScannedResult] = useState('')
  const [totalChecked, setTotalChecked] = useState(0)
  const [counter, setCounter] = useState(0)

  const startJob = async () => {
    const res = await updateJobStatus(
      jobDetail?.id ?? '',
      JOB_STATUS.InProgress
    )
    if (res && res.status === 200) {
      //Alert.alert('Success', 'Job is started');
      //navigation.navigate('Jobs');
      //await loadJob();
      setCounter(() => counter + 1)
    } else {
      //Alert.alert('Failed', 'Start job failed');
      Toast.show('Start job failed', {
        textColor: Colors.red,
        backgroundColor: Colors.yellow,
      })
    }
  }

  const updateProgress = async () => {
    const res = await updateJobProgress(
      jobDetail?.id ?? '',
      jobDetail?.jobProgressId === JOB_PROGRESS.Paused
        ? JOB_PROGRESS.Started
        : JOB_PROGRESS.Paused
    )
    if (res && res.status === 200) {
      Alert.alert('Success', 'Job is saved')
      navigation.navigate('Jobs')
    } else {
      Alert.alert('Failed', 'Save job failed')
    }
  }

  const finishJob = async () => {
    var uncheckedAssets =
      jobDetail?.assets.filter(
        (ja) => ja.jobAssetStatusId === JOB_ASSET_STATUS.NotCheck
      )?.length ?? 0
    if (uncheckedAssets > 0) {
      Alert.alert(
        'Warning',
        `There ${
          uncheckedAssets > 1 ? 'are' : 'is'
        } ${uncheckedAssets} asset not yet checked, Are you sure to finish?`,
        [
          {
            text: 'Cancel',
            onPress: () => setLoading(false),
            style: 'cancel',
          },
          { text: 'OK', onPress: doFinishJob },
        ],
        { cancelable: true }
      )
    } else {
      await doFinishJob()
    }
  }

  const doFinishJob = async () => {
    setLoading(true)

    const res = await updateJobStatus(jobDetail?.id ?? '', JOB_STATUS.Finished)
    if (res && res.status === 200) {
      //Alert.alert('Success', 'Job is saved');
      Toast.show('Job was saved', {
        //textColor: Colors.white,
        //backgroundColor: Colors.green,
      })
      setLoading(false)
      navigation.navigate('Jobs')
    } else {
      //Alert.alert('Failed', 'Save job failed');
      Toast.show('Save job failed', {
        textColor: Colors.red,
        backgroundColor: Colors.yellow,
      })
      setLoading(false)
    }
  }

  const openCamera = () => setShowCamera(true)
  const closeCamera = () => setShowCamera(false)

  const loadJob = async () => {
    setLoading(true)
    const res = await getJob(route.params?.id)
    if (res && res.status === 200 && res.data) {
      setJobDetail(res.data)
    }
    setLoading(false)
  }

  const handleBarCodeScanned = async ({
    type,
    data,
    cornerPoints,
  }: BarcodeScanningResult) => {
    setScannedResult(data)
    closeCamera()
    // check asset in system
    setLoading(true)
    const res = await updateJobAssetStatus({
      jobId: jobDetail?.id ?? route.params?.id,
      assetId: data,
      status: JOB_ASSET_STATUS.Checked,
    })

    let title = ''
    let bgColor = Colors.red

    if (res && res.status === 200) {
      if (res.data) {
        if (res.data.repeated) {
          title = `Asset serial no "${res.data.serialNo}" was Repeated`
          bgColor = Colors.yellow
        } else if (res.data.wrongShipTo) {
          title = `Asset serial no "${res.data.serialNo}" was Wrong Ship-To`
        } else {
          bgColor = Colors.green
          title = `Asset serial no "${res.data.serialNo}" was checked`
        }

        Toast.show(title, {
          position: Toast.positions.CENTER,
          duration: Toast.durations.LONG,
          backgroundColor: bgColor,
          keyboardAvoiding: true,
          hideOnPress: true,
          animation: true,
        })
      } else {
        Toast.show(`QR Code "${data}" Not Found`, {
          position: Toast.positions.CENTER,
          duration: Toast.durations.LONG,
          backgroundColor: Colors.red,
          keyboardAvoiding: true,
          hideOnPress: true,
          animation: true,
        })
      }

      //await loadJob();
      setCounter(() => counter + 1)
    } else {
      Toast.show(`Request failed "${res.statusText}"`, {
        position: Toast.positions.CENTER,
        duration: Toast.durations.LONG,
        backgroundColor: Colors.red,
        keyboardAvoiding: true,
        hideOnPress: true,
        animation: true,
      })
    }

    setLoading(false)
  }

  const checkedItemCount = () =>
    jobDetail?.assets.filter(
      (ja) => ja.jobAssetStatusId !== JOB_ASSET_STATUS.NotCheck
    )?.length ?? 0

  const itemCount = () => jobDetail?.assets.length ?? 0

  const jobProgress = () =>
    checkedItemCount() === 0
      ? 0
      : ((checkedItemCount() / itemCount()) * 100).toFixed(1)

  useEffect(() => {
    ;(async function () {
      await loadJob()
    })()
  }, [counter])

  return (
    <View style={{ ...baseStyles.container }}>
      {/* <ScrollView style={baseStyles.scrollView}> */}
      {loading && <Loading loading={loading} />}
      <View
        style={{
          flex: jobDetail?.jobStatusId === JOB_STATUS.Pending ? 0.9 : 0.8,
        }}
      >
        {jobDetail && (
          <JobDetail
            data={jobDetail}
            progress={`${jobProgress()}% ${checkedItemCount()}/${itemCount()}`}
          />
        )}
        <ModalCamera
          openCamera={openCamera}
          closeCamera={closeCamera}
          showCamera={showCamera}
          onBarcodeScanned={handleBarCodeScanned}
          mode={'scan'}
        />
      </View>

      {/* </ScrollView> */}
      {jobDetail?.jobStatusId === JOB_STATUS.Pending && (
        <View
          style={{
            //...baseStyles.buttonGroupBottom,
            flex: 0.1,
            //height: '10%',
          }}
        >
          <Button title="START" onPress={startJob} />
        </View>
      )}
      {jobDetail?.jobStatusId === JOB_STATUS.InProgress && (
        <View
          style={{
            ...baseStyles.buttonGroupBottom,
            flex: 0.2,
          }}
        >
          <Button title={'SCAN ASSET'} onPress={openCamera} />
          <View>
            <Text style={baseStyles.textCenter}>
              Progress {jobProgress()}% ({checkedItemCount()}/{itemCount()}{' '}
              checked)
            </Text>
            <Button title="FINISH" onPress={finishJob} />
          </View>
        </View>
      )}
    </View>
  )
}
