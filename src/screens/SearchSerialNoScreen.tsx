import { StackScreenProps } from '@react-navigation/stack';
import _ from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import 'react-native-get-random-values';
import useAssetApi from '~apis/useAssetApi';
import { AssetDetailModel, ReportAssetModel } from '~types/assets';
import baseStyles from '../styles/baseStyles';
import { RootStackParamList } from '../types';
import Loading from '~components/shared/Loading';
import Colors from '~constants/Colors';
import AssetDetails from '~components/assets/AssetDetails';
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectItemOption } from '~types/selectOptions';
import ModalCamera from '~components/shared/ModalCamera';
import { CameraCapturedPicture } from 'expo-camera';
import { UploadFileBase64Model } from '~types/fileUploads';
import { v4 as uuidv4 } from 'uuid';
import extractFileName from '~utils/extractFileName';
import useUploadApi from '~apis/useUploadApi';
import Toast from 'react-native-root-toast';
import useAssetNotificationApi from '~apis/useAssetNotificationApi';
import { DateTimeFormat } from '~utils/format';

export default function SearchSerialNoScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'SearchSerialNo'>) {
  const { getAssetInfo, searchAssets } = useAssetApi();
  const { reportAssetLocation } = useAssetNotificationApi();
  const { uploadFile } = useUploadApi();
  const [serialNo, setSerialNo] = useState('');
  const [searchText, setSearchText] = useState('');
  const [assets, setAssets] = useState<AssetDetailModel[]>([]);
  const [asset, setAsset] = useState<AssetDetailModel | undefined | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [assetOptions, setAssetOptions] = useState<SelectItemOption[]>([]);
  const [attachments, setAttachemnts] = useState<CameraCapturedPicture[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const openCamera = () => setShowCamera(true);
  const closeCamera = () => setShowCamera(false);

  const submitReport = async (photo: CameraCapturedPicture) => {
    setLoading(true);

    const uploadSuccess = await addAttachment(photo);

    if (uploadSuccess) {
      const data: ReportAssetModel = {
        assetId: asset?.assetId ?? '',
        serialNo: asset?.serialNo ?? '',
        location: asset?.locationId ?? '',
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

  const addAttachment = async (photo: CameraCapturedPicture) => {
    // upload file
    if (photo && photo.uri && photo.base64) {
      setAttachemnts([...attachments, photo]);
      const data: UploadFileBase64Model = {
        id: uuidv4(),
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

  const search = async () => {
    setLoading(true);
    const res = await searchAssets(searchText);

    if (res.status === 200) {
      const data = res.data.records as AssetDetailModel[];
      setAssets(data);
      setAssetOptions(
        data.map((item) => ({ label: item.serialNo, value: item.serialNo }))
      );
    }

    setLoading(false);
  };

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    if (serialNo.length === 0) setAsset(null);
    else setAsset(assets.find((x) => x.serialNo === serialNo));
  }, [serialNo]);

  useEffect(() => {
    (async function () {
      if (searchText.length === 0) {
        setAssetOptions([]);
      } else {
        if (searchText.length >= 3) await search();
      }
    })();
  }, [searchText]);

  return (
    <>
      <ScrollView style={baseStyles.scrollView}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={baseStyles.container}
        >
          <DropDownPicker
            placeholder='Search serial no.'
            searchable={true}
            loading={loading}
            searchPlaceholder={'put at least 3 letters to search...'}
            open={open}
            value={serialNo}
            items={assetOptions}
            setOpen={toggleDropdown}
            setValue={setSerialNo}
            listMode='MODAL'
            onChangeSearchText={(text: string) => {
              setSearchText(text);
            }}
            maxHeight={600}
            selectedItemContainerStyle={{
              backgroundColor: Colors.yellow,
            }}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: 'center' }}>No item found</Text>
            )}
          />
          {serialNo.length > 0 && asset && assets.length > 0 && (
            <AssetDetails data={asset} />
          )}
          <View style={{ ...baseStyles.container }}>
            {loading && <Loading loading={loading} />}

            {searchText.length > 0 && assets.length === 0 && (
              <View style={{ ...baseStyles.container, marginTop: 100 }}>
                <View style={baseStyles.column}>
                  <View>
                    <Text
                      style={{
                        ...baseStyles.textCenter,
                        fontSize: 18,
                        color: Colors.yellow,
                      }}
                    >
                      {searchText}
                    </Text>
                    <Text
                      style={{
                        ...baseStyles.textCenter,
                        fontSize: 18,
                        color: Colors.red,
                      }}
                    >
                      NOT FOUND
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    padding: 5,
                    justifyContent: 'space-between',
                    flex: 0.5,
                  }}
                >
                  <Button
                    icon={
                      <Icon
                        name='clipboard'
                        type='font-awesome-5'
                        size={28}
                        color={Colors.white}
                      />
                    }
                    title=' Report this item'
                    onPress={() =>
                      navigation.navigate('ReportAsset', {
                        serialNo: searchText,
                      })
                    }
                  />
                </View>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {asset && assets.length > 0 && (
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
              navigation.navigate('ReportAsset', {
                serialNo: asset?.serialNo,
              })
            }
          />
          <Button
            icon={
              <Icon
                name='camera'
                type='font-awesome-5'
                size={28}
                color='white'
              />
            }
            title='  Take a Photo & Confirm'
            loading={loading}
            onPress={openCamera}
          />
        </View>
      )}
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
