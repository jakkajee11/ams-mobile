import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {
  BarCodeScanningResult,
  CameraCapturedPicture,
  Camera as ExpoCamera,
} from 'expo-camera';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import { Overlay, Button, Icon, Header } from 'react-native-elements';
import useAssetApi from '~apis/useAssetApi';
import useUploadApi from '~apis/useUploadApi';
import { AssetDetailModel, ReportAssetModel } from '~types/assets';
import { UploadFileBase64Model } from '~types/fileUploads';
import extractFileName from '~utils/extractFileName';
import Storages from '~utils/Storages';
import Colors from '../constants/Colors';
import baseStyles from '../styles/baseStyles';
import { v4 as uuidv4 } from 'uuid';

import { RootStackParamList } from '../types';
import Camera from '~components/shared/Camera';

export default function ScanQRCodeFoundScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ScanQRCodeFound'>) {
  //const asset = route.params?.data
  const { getAssetInfo, reportAssetLocation } = useAssetApi();
  const { uploadFile } = useUploadApi();
  const [asset, setAsset] = useState<AssetDetailModel | undefined>(undefined);
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

  useEffect(() => {
    (async function () {
      const res = await getAssetInfo('Import-002');
      console.log(['res', res.status, res.data]);
      if (res && res.status === 401) {
        const token = await Storages.getAccessToken();
        //console.log(['token', token]);
      } else if (res.status === 200) {
        setAsset(res.data);
      }
    })();
  }, []);

  return (
    <>
      <Header
        leftComponent={{
          icon: 'arrow-left',
          type: 'font-awesome-5',
          color: Colors.black,
          iconStyle: { color: Colors.black },
        }}
        centerComponent={{
          text: asset?.assetId,
          style: { color: Colors.black },
        }}
        rightComponent={{
          icon: 'home',
          type: 'font-awesome-5',
          color: Colors.black,
        }}
        backgroundColor={Colors.yellow}
      />
      <StatusBar backgroundColor={Colors.yellow} />
      <ScrollView style={baseStyles.scrollView}>
        <View style={baseStyles.container}>
          <View style={{ padding: 5 }}>
            <View style={styles.row}>
              <Text style={styles.label}>Asset ID:</Text>
              <Text>{asset?.assetId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Asset Type:</Text>
              <Text>{asset?.assetTypeName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Serial No.:</Text>
              <Text>{asset?.serialNo}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Asset No.:</Text>
              <Text>{asset?.assetNo}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Cost Center:</Text>
              <Text>{asset?.costCenterName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Year of Mfg:</Text>
              <Text>{asset?.yearOfManufacture}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Warrenty:</Text>
              <Text>{asset?.warrantyEndAt}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Asset Class:</Text>
              <Text>{asset?.assetClassName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Location:</Text>
              <Text>{asset?.location}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Sub-Location:</Text>
              <Text>{asset?.subLocation}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text>{asset?.assetStatusName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Others:</Text>
              <Text>{asset?.others}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Details:</Text>
              <Text>{asset?.details}</Text>
            </View>

            {asset?.attachments && asset?.attachments.length > 0 && (
              <>
                <Text>Attachments</Text>
                <View style={baseStyles.attachmentContainer}>
                  {asset.attachments
                    .filter((atm) => atm.type === 0)
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
              showOptions={false}
              showImagePicker={false}
            />
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 2,
    padding: 5,
    //backgroundColor: Colors.yellow,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
  },
  text: {
    fontSize: 18,
    color: 'red',
    margin: 20,
  },
  label: {
    fontStyle: 'normal',
  },
  buttonGroupBottom: {
    width: '100%',
    padding: 5,
    justifyContent: 'space-around',
    flex: 0.4,
  },
});
