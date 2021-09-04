import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {
  BarCodeScanningResult,
  CameraCapturedPicture,
  Camera as ExpoCamera,
} from 'expo-camera';
import _ from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Overlay,
  Button,
  Icon,
  Header,
  Image,
  Input,
} from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import useAssetApi from '~apis/useAssetApi';
import useUploadApi from '~apis/useUploadApi';
import Camera from '~components/shared/Camera';
import { ReportAssetModel } from '~types/assets';
import { UploadFileBase64Model } from '~types/fileUploads';
import extractFileName from '~utils/extractFileName';
import Colors from '../constants/Colors';
import baseStyles from '../styles/baseStyles';

import { RootStackParamList } from '../types';

export default function ReportAssetScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ReportAsset'>) {
  const { getAssetInfo, reportAssetLocation } = useAssetApi();
  const { uploadFile } = useUploadApi();
  const [assetId, setAssetId] = useState(route.params?.assetId ?? '');
  const [location, setLocation] = useState('');
  const [subLocation, setSubLocation] = useState('');
  const [details, setDetails] = useState('');
  const [attachments, setAttachemnts] = useState<CameraCapturedPicture[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [id] = useState(uuidv4());
  const [loading, setLoading] = useState(false);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const maximum = 5;

  const doReportAsset = async () => {
    setLoading(true);
    const data: ReportAssetModel = {
      assetId,
      location,
      subLocation,
      details,
      attachments: [],
    };

    const res = await reportAssetLocation(data);

    if (res && res.status === 200) {
      Alert.alert('Success', 'Asset was successfully reported');
      reset();
    } else {
      Alert.alert('Error', 'Report asset failed');
      setLoading(false);
    }
  };

  const reportAsset = async () => {
    if (assetId.length === 0 || location.length === 0) {
      Alert.alert('Code and Location must not be empty!');
    } else {
      setLoading(true);

      const res = await getAssetInfo(assetId);

      if (res && res.status === 204) {
        Alert.alert(
          'Warning!',
          `Asset ID "${assetId}" not exist in system. Are you sure to submit a report?`,
          [
            {
              text: 'Cancel',
              onPress: () => setLoading(false),
              style: 'cancel',
            },
            { text: 'OK', onPress: doReportAsset },
          ],
          { cancelable: true }
        );
      } else {
        await doReportAsset();
      }
    }
  };

  const openCamera = () => setShowCamera(true);
  const closeCamera = () => setShowCamera(false);

  const addAttachment = async (photo: CameraCapturedPicture) => {
    // upload file
    if (photo && photo.uri && photo.base64) {
      setAttachemnts([...attachments, photo]);
      const data: UploadFileBase64Model = {
        id,
        fileName: extractFileName(photo.uri),
        base64: photo.base64,
        refCode: assetId,
      };
      const res = await uploadFile(data);
      if (res && res.status !== 200) {
        setUploadErrors([...uploadErrors, extractFileName(photo.uri)]);
      }
    }
  };

  const reset = () => {
    setAssetId('');
    setLocation('');
    setSubLocation('');
    setDetails('');
    setAttachemnts([]);
    setLoading(false);
  };

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
                label='Asset ID'
                renderErrorMessage={assetId === ''}
                errorMessage={assetId.length > 0 ? undefined : '* Required'}
                onChangeText={(text) => setAssetId(text)}
                value={assetId}
              />
              <Input
                //placeholder='Location (Required)'
                label='Location'
                renderErrorMessage={true}
                errorMessage={location.length > 0 ? undefined : '* Required'}
                onChangeText={(text) => setLocation(text)}
                value={location}
              />
              <Input
                label='Sub Location'
                onChangeText={(text) => setSubLocation(text)}
                value={subLocation}
              />
              <Input
                label='Detail'
                multiline
                numberOfLines={4}
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
      <View style={baseStyles.buttonGroupBottom}>
        <Button
          icon={
            <Icon name='camera' type='font-awesome-5' size={28} color='white' />
          }
          title={
            attachments.length === maximum
              ? ` Reach maximum (${maximum})`
              : ' Take a photo'
          }
          disabled={assetId.length === 0 || attachments.length === maximum}
          onPress={openCamera}
        />
        <Button
          icon={
            <Icon name='save' type='font-awesome-5' size={28} color='white' />
          }
          title=' Submit'
          disabled={assetId.length === 0 || location.length === 0}
          loading={loading}
          onPress={reportAsset}
        />
      </View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showCamera}
        presentationStyle={'overFullScreen'}
        onRequestClose={closeCamera}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%',
            width: '100%',
          }}
        >
          {showCamera && (
            <Camera
              onClose={closeCamera}
              onTakePicture={(photo: CameraCapturedPicture) =>
                addAttachment(photo)
              }
              onBarCodeScanned={undefined}
            />
          )}
        </View>
      </Modal>
    </>
  );
}
