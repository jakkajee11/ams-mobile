import { StackScreenProps } from '@react-navigation/stack';
import { CameraCapturedPicture } from 'expo-camera';
import * as React from 'react';
import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
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
import useAssetNotificationApi from '~apis/useAssetNotificationApi';
import Toast from 'react-native-root-toast';
import AssetDetails from '~components/assets/AssetDetails';

export default function ScanQRCodeFoundScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ScanQRCodeFound'>) {
  const { reportAssetLocation } = useAssetNotificationApi();
  const { uploadFile } = useUploadApi();
  const [asset, setAsset] = useState<AssetDetailModel | undefined>(
    route.params?.data
  );
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachemnts] = useState<CameraCapturedPicture[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [id] = useState(uuidv4());
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const submitReport = async (photo: CameraCapturedPicture) => {
    setLoading(true);

    const uploadSuccess = await addAttachment(photo);

    if (uploadSuccess) {
      const data: ReportAssetModel = {
        assetId: asset?.assetId ?? '',
        serialNo: asset?.serialNo ?? '',
        location: asset?.location ?? '',
        details: asset?.details,
        comments: 'Confirm Location',
        attachments: [],
      };

      const res = await reportAssetLocation(data);

      if (res && res.status === 200) {
        Toast.show(`Asset was reported successfully`, {});
      } else {
        Toast.show(`Error: Report asset failed`, {
          //position: Toast.positions.CENTER,
          textColor: Colors.red,
          backgroundColor: Colors.yellow,
        });
      }
    } else {
      Toast.show(`Error: Report asset failed`, {
        //position: Toast.positions.CENTER,
        textColor: Colors.red,
        backgroundColor: Colors.yellow,
      });
    }

    setLoading(false);
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
        return false;
      }

      return true;
    }

    return false;
  };

  return (
    <>
      <Header title={asset?.serialNo ?? 'QR CODE FOUNDED'} />
      <StatusBar backgroundColor={Colors.yellow} />
      <ScrollView style={baseStyles.scrollView}>
        {loading && <ActivityIndicator animating={loading} size='large' />}
        <AssetDetails data={asset} />
        {/* <View style={baseStyles.container}>
          <View style={{ padding: 5 }}>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Serial No.:</Text>
              <Text>{asset?.serialNo}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Asset Type:</Text>
              <Text>{asset?.assetTypeName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Asset Type Details:</Text>
              <Text>{asset?.assetTypeDetailName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Details:</Text>
              <Text>{asset?.details}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Cost Center:</Text>
              <Text>{asset?.costCenterName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Asset Class:</Text>
              <Text>{asset?.assetClassName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Sold-To:</Text>
              <Text>{asset?.soldToName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Ship-To:</Text>
              <Text>{asset?.shipToName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Status:</Text>
              <Text>{asset?.assetStatusName}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Location:</Text>
              <Text>{asset?.location}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Year of Mfg:</Text>
              <Text>{asset?.yearOfManufacture}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Warranty:</Text>
              <Text>{asset?.warrantyEndAt}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Asset QR Code:</Text>
              <Text>{asset?.assetId}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Asset No.:</Text>
              <Text>{asset?.assetNo}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Aging:</Text>
              <Text>{asset?.agingEnabled}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Others:</Text>
              <Text>{asset?.others}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text style={baseStyles.label}>Comments:</Text>
              <Text>{asset?.comments}</Text>
            </View>

            <Text>Attachments</Text>
            {!asset?.attachments ||
              (asset?.attachments.length === 0 && (
                <Text>[ No Attachment ]</Text>
              ))}
            {asset?.attachments && asset?.attachments.length > 0 && (
              <>
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

            {attachments && attachments.length > 0 && (
              <View style={{ marginTop: 20 }}>
                <Text style={baseStyles.textCenter}>Taken Photo</Text>
                {attachments.map((atm) => (
                  <View key={atm.uri}>
                    <Image
                      source={{
                        uri: atm.uri,
                      }}
                      style={baseStyles.image}
                    />
                    <Text>{extractFileName(atm.uri)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View> */}
      </ScrollView>
      <View style={{ ...baseStyles.buttonGroupBottom, flex: 0.2 }}>
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
          onPress={() =>
            navigation.navigate('ReportAsset', { serialNo: asset?.serialNo })
          }
        />
        <Button
          icon={
            <Icon name='camera' type='font-awesome-5' size={28} color='white' />
          }
          title='  Take a Photo & Confirm'
          loading={loading}
          onPress={openCamera}
        />
      </View>

      <ModalCamera
        showCamera={showCamera}
        openCamera={openCamera}
        closeCamera={closeCamera}
        onTakePicture={submitReport}
        mode='photo'
      />
    </>
  );
}
