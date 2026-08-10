import { StackScreenProps } from '@react-navigation/stack'
import { CameraCapturedPicture } from 'expo-camera'
import _ from 'lodash'
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Button, CheckBox, Icon, Image, Input } from '@rn-vui/themed'
import 'react-native-get-random-values'
import Toast from 'react-native-root-toast'
import { v4 as uuidv4 } from 'uuid'
import useAssetApi from '~apis/useAssetApi'
import useAssetNotificationApi from '~apis/useAssetNotificationApi'
import useUploadApi from '~apis/useUploadApi'
import ModalCamera from '~components/shared/ModalCamera'
import Colors from '~constants/Colors'
import { ReportAssetModel } from '~types/assets'
import { UploadFileBase64Model } from '~types/fileUploads'
import extractFileName from '~utils/extractFileName'
import baseStyles from '../styles/baseStyles'
import { RootStackParamList } from '../types'

export default function ReportAssetScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ReportAsset'>) {
  const { getAssetInfo } = useAssetApi()
  const { reportAssetLocation } = useAssetNotificationApi()
  const { uploadFile } = useUploadApi()
  const [searchText, setSearchText] = useState(
    route.params?.assetId ?? route.params?.serialNo ?? ''
  )
  const [location, setLocation] = useState('')
  const [details, setDetails] = useState('')
  const [attachments, setAttachemnts] = useState<CameraCapturedPicture[]>([])
  const [showCamera, setShowCamera] = useState(false)
  //const [id] = useState(uuidv4());
  const [loading, setLoading] = useState(false)
  const [uploadErrors, setUploadErrors] = useState<string[]>([])
  const [buttonDisplay, setButtonDisplay] = useState<'flex' | 'none'>('flex')

  const maximum = 5

  const submitReportAsset = async () => {
    setLoading(true)
    const data: ReportAssetModel = {
      assetId: route.params?.assetId ? route.params?.assetId : searchText,
      serialNo: route.params?.serialNo ? route.params?.serialNo : searchText,
      location,
      details,
      attachments: [],
    }

    const res = await reportAssetLocation(data)

    if (res && res.status === 200) {
      Toast.show(`Asset was reported successfully`, {})
      reset()
    } else {
      Toast.show(
        `Error (${res.status}): Report asset failed. please try again.`,
        {
          textColor: Colors.red,
          backgroundColor: Colors.yellow,
        }
      )
      setLoading(false)
    }
  }

  const reportAsset = async () => {
    if (
      searchText.length === 0 ||
      location.length === 0 ||
      details.length === 0
    ) {
      Toast.show(
        `Serial No./QR Code, Location and details must not be empty!`,
        {
          //position: Toast.positions.CENTER,
          textColor: Colors.red,
          backgroundColor: Colors.yellow,
        }
      )
    } else {
      setLoading(true)

      const res = await getAssetInfo(searchText)

      if (res && res.status === 204) {
        Alert.alert(
          'Warning!',
          `Serial No./QR Code "${searchText}" not exist in system. Are you sure to submit a report?`,
          [
            {
              text: 'Cancel',
              onPress: () => setLoading(false),
              style: 'cancel',
            },
            { text: 'OK', onPress: submitReportAsset },
          ],
          { cancelable: true }
        )
      } else {
        await submitReportAsset()
      }
    }
  }

  const openCamera = () => setShowCamera(true)
  const closeCamera = () => setShowCamera(false)

  const addAttachment = async (photo: CameraCapturedPicture) => {
    // upload file
    if (photo && photo.uri && photo.base64) {
      setAttachemnts([...attachments, photo])
      const data: UploadFileBase64Model = {
        id: uuidv4(),
        fileName: extractFileName(photo.uri),
        base64: photo.base64,
        refCode: searchText,
      }
      const res = await uploadFile(data)
      if (res && res.status !== 200) {
        setUploadErrors([...uploadErrors, extractFileName(photo.uri)])
      }
    }
  }

  const reset = () => {
    setSearchText('')
    setLocation('')
    setDetails('')
    setAttachemnts([])
    setLoading(false)
  }

  const hideActionButton = () => {
    setButtonDisplay('none')
  }

  const showActionButton = () => {
    setButtonDisplay('flex')
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', hideActionButton)
    Keyboard.addListener('keyboardDidHide', showActionButton)

    // cleanup function
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow')
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [])

  return (
    <>
      <ScrollView style={baseStyles.scrollView}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={baseStyles.container}
        >
          <View style={baseStyles.container}>
            <View>
              <Input
                //placeholder='Code (Required)'
                maxLength={255}
                label="Serial No./QR Code"
                renderErrorMessage={searchText === ''}
                errorMessage={searchText.length > 0 ? undefined : '* Required'}
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
              />
              <Input
                //placeholder='Location (Required)'
                label="Location"
                renderErrorMessage={true}
                errorMessage={location.length > 0 ? undefined : '* Required'}
                onChangeText={(text) => setLocation(text)}
                value={location}
              />
              <Input
                label="Detail"
                multiline
                numberOfLines={4}
                renderErrorMessage={true}
                errorMessage={details.length > 0 ? undefined : '* Required'}
                onChangeText={(text) => setDetails(text)}
                value={details}
              />
            </View>

            {attachments.length > 0 && (
              <View style={baseStyles.attachmentContainer}>
                {attachments.map((img) => (
                  <View key={extractFileName(img.uri)}>
                    <Image source={{ uri: img.uri }} style={baseStyles.image} />
                    <Text>{extractFileName(img.uri)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View
        style={{
          ...baseStyles.buttonGroupBottom,
          flex: 0.2,
          display: buttonDisplay,
        }}
      >
        <Button
          icon={
            <Icon name="camera" type="font-awesome-5" size={28} color="white" />
          }
          title={
            attachments.length === maximum
              ? ` Reach maximum (${maximum})`
              : ' Take a photo'
          }
          disabled={
            searchText.length === 0 ||
            location.length === 0 ||
            details.length === 0 ||
            attachments.length === maximum
          }
          onPress={openCamera}
        />
        <Text></Text>
        <Button
          icon={
            <Icon name="save" type="font-awesome-5" size={28} color="white" />
          }
          title=" Submit"
          disabled={
            searchText.length === 0 ||
            location.length === 0 ||
            details.length === 0
          }
          loading={loading}
          onPress={reportAsset}
        />
      </View>
      <ModalCamera
        showCamera={showCamera}
        openCamera={openCamera}
        closeCamera={closeCamera}
        onTakePicture={addAttachment}
        mode="photo"
      />
    </>
  )
}
