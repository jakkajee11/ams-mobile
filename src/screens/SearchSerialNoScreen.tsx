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
} from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import 'react-native-get-random-values';
import useAssetApi from '~apis/useAssetApi';
import { AssetDetailModel } from '~types/assets';
import baseStyles from '../styles/baseStyles';
import { RootStackParamList } from '../types';
import Loading from '~components/shared/Loading';
import Colors from '~constants/Colors';
import AssetDetails from '~components/assets/AssetDetails';
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectItemOption } from '~types/selectOptions';

export default function SearchSerialNoScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'SearchSerialNo'>) {
  const { getAssetInfo, searchAssets } = useAssetApi();
  const [serialNo, setSerialNo] = useState('');
  const [searchText, setSearchText] = useState('');
  const [assets, setAssets] = useState<AssetDetailModel[]>([]);
  const [asset, setAsset] = useState<AssetDetailModel | undefined | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [assetOptions, setAssetOptions] = useState<SelectItemOption[]>([]);

  const searchAsset = async () => {
    if (serialNo.length > 0) {
      setLoading(true);

      const res = await getAssetInfo(serialNo);

      if (res && res.status === 200) {
        setAsset(res.data);
      } else {
        setAsset(undefined);
      }

      setLoading(false);
    }
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
      <ScrollView
        style={baseStyles.scrollView}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={loading}
        //     onRefresh={prepareData}
        //     colors={[Colors.yellow]}
        //   />
        // }
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={baseStyles.container}
        >
          <View>
            <View
              style={{
                ...baseStyles.container,
                minHeight: 500,
                //maxHeight: 500,
              }}
            >
              <DropDownPicker
                placeholder='Search serial no.'
                searchable={true}
                loading={loading}
                searchPlaceholder={'at least 3 letters to search...'}
                open={open}
                value={serialNo}
                items={assetOptions}
                setOpen={toggleDropdown}
                setValue={setSerialNo}
                //setItems={setAddressOptions}
                onChangeSearchText={(text: string) => {
                  console.log(['Search', text]);
                  setSearchText(text);
                }}
                maxHeight={600}
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
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}
