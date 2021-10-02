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

export default function SearchSerialNoScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'SearchSerialNo'>) {
  const { getAssetInfo } = useAssetApi();
  const [serialNo, setSerialNo] = useState('');
  const [asset, setAsset] = useState<AssetDetailModel | undefined | null>(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (serialNo.length === 0) setAsset(null);
  }, [serialNo]);

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
          <View style={{ ...baseStyles.container, minHeight: 200 }}>
            <Input
              placeholder='Serial No.'
              rightIcon={
                <Icon
                  name='search'
                  type='Feather'
                  size={30}
                  color={Colors.black}
                  onPress={searchAsset}
                />
              }
              onChangeText={(text) => setSerialNo(text)}
              onBlur={searchAsset}
              value={serialNo}
            />

            {loading && <Loading loading={loading} />}

            {serialNo.length > 0 && asset === undefined && (
              <View style={baseStyles.container}>
                <View style={baseStyles.column}>
                  <View>
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
                      navigation.navigate('ReportAsset', { serialNo })
                    }
                  />
                </View>
              </View>
            )}
            {serialNo.length > 0 && asset && <AssetDetails data={asset} />}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}
