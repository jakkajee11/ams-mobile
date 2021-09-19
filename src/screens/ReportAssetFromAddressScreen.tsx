import { StackScreenProps } from '@react-navigation/stack';
import { CameraCapturedPicture } from 'expo-camera';
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
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import { Button, Icon, Image, Input } from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import useAssetApi from '~apis/useAssetApi';
import useMasterDataApi from '~apis/useMasterDataApi';
import useUploadApi from '~apis/useUploadApi';
import ModalCamera from '~components/shared/ModalCamera';
import { AssetDetailModel, AssetModel, ReportAssetModel } from '~types/assets';
import { UploadFileBase64Model } from '~types/fileUploads';
import extractFileName from '~utils/extractFileName';
import baseStyles from '../styles/baseStyles';
import { RootStackParamList } from '../types';
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectItemOption } from '~types/selectOptions';
import Asset from '~components/assets/Asset';
import JobAsset from '~components/jobs/JobAsset';
import { ShipAddressModel } from '~types/masterData';
import Loading from '~components/shared/Loading';
import { CreateShipJobModel } from '~types/jobs';
import useJobApi from '~apis/useJobApi';

export default function ReportAssetFromAddressScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ReportAssetFromAddress'>) {
  const { getAssetByAddressId } = useAssetApi();
  const { getShipAddresses } = useMasterDataApi();
  const { createShipJob } = useJobApi();
  const [addressId, setAddressId] = useState('');
  const [assets, setAssets] = useState<AssetDetailModel[]>([]);
  const [open, setOpen] = useState(false);
  const [addressOptions, setAddressOptions] = useState<SelectItemOption[]>([]);

  const [id] = useState(uuidv4());
  const [loading, setLoading] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState<'flex' | 'none'>('flex');

  const reportAsset = async () => {
    const payload: CreateShipJobModel = {
      addressId,
    };

    const res = await createShipJob(payload);
    if (res.status === 200) {
      alert('Job created successfully');
    } else {
      alert('Create job failed');
    }
  };

  const hideActionButton = () => {
    setButtonDisplay('none');
  };

  const showActionButton = () => {
    setButtonDisplay('flex');
  };

  const renderItem = ({ item }: ListRenderItemInfo<AssetDetailModel>) => {
    return (
      <Asset
        data={item}
        onPress={() =>
          navigation.navigate('AssetDetails', { assetId: item.assetId })
        }
      />
    );
  };

  const toggleDropdown = () => setOpen(!open);

  const getAssetFromAddress = async () => {
    setLoading(true);
    const res = await getAssetByAddressId(addressId);

    if (res.status === 200) {
      setAssets(res.data.records as AssetDetailModel[]);
    }

    setLoading(false);
  };

  const prepareData = async () => {
    const res = await getShipAddresses({ page: 0, size: 10, search: '' });
    console.log(['res', res.data]);
    if (res.status === 200) {
      const data = res.data.records as ShipAddressModel[];
      setAddressOptions(
        data.map((item) => ({ label: item.name, value: item.id }))
      );
    }
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', hideActionButton);
    Keyboard.addListener('keyboardDidHide', showActionButton);

    prepareData();

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', hideActionButton);
      Keyboard.removeListener('keyboardDidHide', showActionButton);
    };
  }, []);

  useEffect(() => {
    (async function () {
      await getAssetFromAddress();
      // const res = await getAssetByAddressId(addressId);
      // console.log(['res', res.data.records]);
      // if (res.status === 200) {
      //   setAssets(res.data.records as AssetDetailModel[]);
      // }
    })();
  }, [addressId]);

  return (
    <>
      <ScrollView style={baseStyles.scrollView}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={baseStyles.container}
        >
          <View style={{ ...baseStyles.container, minHeight: 200 }}>
            <DropDownPicker
              placeholder='Select address'
              searchable={true}
              loading={loading}
              searchPlaceholder={'search...'}
              open={open}
              value={addressId}
              items={addressOptions}
              setOpen={toggleDropdown}
              setValue={setAddressId}
              //setItems={setAddressOptions}
            />
            {loading && <Loading loading={loading} />}
            {assets.length > 0 && (
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <FlatList
                  keyExtractor={(item) => item.assetId}
                  ListFooterComponent={
                    <Text
                      style={{
                        //...styles.text,
                        textAlign: 'center',
                        //fontStyle: 'italic',
                      }}
                    >
                      Total {assets.length}{' '}
                      {`${assets.length > 1 ? 'assets' : 'asset'}`}
                    </Text>
                  }
                  data={assets}
                  renderItem={renderItem}
                />
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
            <Icon name='save' type='font-awesome-5' size={28} color='white' />
          }
          title=' Create Job'
          disabled={addressId.length === 0}
          loading={loading}
          onPress={reportAsset}
        />
      </View>
    </>
  );
}
