import { StackScreenProps } from '@react-navigation/stack';
import { CameraCapturedPicture } from 'expo-camera';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  Image,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import useAssetApi from '~apis/useAssetApi';
import useUploadApi from '~apis/useUploadApi';
import { AssetDetailModel, ReportAssetModel } from '~types/assets';
import { UploadFileBase64Model } from '~types/fileUploads';
import extractFileName from '~utils/extractFileName';
import Colors from '../constants/Colors';
import baseStyles from '../styles/baseStyles';
import { v4 as uuidv4 } from 'uuid';
import { RootStackParamList } from '../types';
import Header from '~components/shared/Header';
import { ATTACHMENT_TYPE } from '~constants/Status';
import ModalCamera from '~components/shared/ModalCamera';

export default function ScanQRCodeFoundScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ScanQRCodeFound'>) {
  //const asset = route.params?.data
  const { getAssetInfo, reportAssetLocation } = useAssetApi();
  const { uploadFile } = useUploadApi();
  const [asset, setAsset] = useState<AssetDetailModel | undefined>(
    route.params?.data
  );
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachemnts] = useState<CameraCapturedPicture[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [id] = useState(uuidv4());
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const submitReport = async () => {
    setLoading(true);
    const data: ReportAssetModel = {
      assetId: asset?.assetId ?? '',
      location: asset?.location ?? '',
      subLocation: asset?.subLocation,
      details: asset?.details,
      attachments: [],
    };

    const res = await reportAssetLocation(data);

    if (res && res.status === 200) {
      Alert.alert('Success', 'Asset was successfully reported');
    } else {
      Alert.alert('Error', 'Report asset failed');
      setLoading(false);
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
        refCode: asset?.assetId,
      };
      const res = await uploadFile(data);
      if (res && res.status !== 200) {
        setUploadErrors([...uploadErrors, extractFileName(photo.uri)]);
      }
    }
  };

  // useEffect(() => {
  //   (async function () {
  //     setLoading(true);
  //     const res = await getAssetInfo('Import-002');
  //     if (res && res.status === 200) {
  //       setAsset(res.data);
  //     }

  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <>
      <Header title={asset?.assetId ?? 'QR CODE FOUNDED'} />
      <StatusBar backgroundColor={Colors.yellow} />
      <ScrollView style={baseStyles.scrollView}>
        <ActivityIndicator animating={loading} size='large' />
        <View style={baseStyles.container}>
          <View style={{ padding: 5 }}>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Asset ID:</Text>
              <Text>{asset?.assetId}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Asset Type:</Text>
              <Text>{asset?.assetTypeName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Serial No.:</Text>
              <Text>{asset?.serialNo}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Asset No.:</Text>
              <Text>{asset?.assetNo}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Cost Center:</Text>
              <Text>{asset?.costCenterName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Year of Mfg:</Text>
              <Text>{asset?.yearOfManufacture}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Warrenty:</Text>
              <Text>{asset?.warrantyEndAt}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Asset Class:</Text>
              <Text>{asset?.assetClassName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Location:</Text>
              <Text>{asset?.location}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Sub-Location:</Text>
              <Text>{asset?.subLocation}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Status:</Text>
              <Text>{asset?.assetStatusName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Others:</Text>
              <Text>{asset?.others}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Details:</Text>
              <Text>{asset?.details}</Text>
            </View>

            {asset?.attachments && asset?.attachments.length > 0 && (
              <>
                <Text>Attachments</Text>
                <View style={baseStyles.attachmentContainer}>
                  {asset.attachments
                    .filter((atm) => atm.type === ATTACHMENT_TYPE.Photo)
                    .map((atm) => (
                      <View key={atm.id}>
                        <Image
                          source={{ uri: `data:image/jpeg;base64,${atm.blob}` }}
                          style={baseStyles.image}
                        />
                        <Text>{atm.schemaName}</Text>
                      </View>
                    ))}
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={{ ...baseStyles.buttonGroupBottom, flex: 0.4 }}>
        <Button
          icon={
            <Icon
              name='clipboard'
              type='font-awesome-5'
              size={28}
              color='white'
            />
          }
          title='  Report this item'
        />
        <Button
          icon={
            <Icon name='camera' type='font-awesome-5' size={28} color='white' />
          }
          title='  Take a photo'
          loading={loading}
          onPress={openCamera}
        />
        <Button
          icon={
            <Icon
              name='check-circle'
              type='font-awesome-5'
              size={28}
              color='white'
            />
          }
          title='  CONFIRM'
          loading={loading}
          onPress={submitReport}
        />
      </View>

      <ModalCamera
        showCamera={showCamera}
        openCamera={openCamera}
        closeCamera={closeCamera}
        onTakePicture={addAttachment}
        mode='photo'
      />
    </>
  );
}
