import { StackScreenProps } from '@react-navigation/stack'
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
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  RefreshControl,
  SectionList,
} from 'react-native'
import { Button, Icon } from '@rn-vui/themed'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import useAssetApi from '~apis/useAssetApi'
import useMasterDataApi from '~apis/useMasterDataApi'
import { AssetDetailModel } from '~types/assets'
import baseStyles from '../styles/baseStyles'
import { RootStackParamList } from '../types'
import DropDownPicker from 'react-native-dropdown-picker'
import { SelectItemOption } from '~types/selectOptions'
import Asset from '~components/assets/Asset'
import { ShipToModel } from '~types/masterData'
import Loading from '~components/shared/Loading'
import { CreateShipJobModel } from '~types/jobs'
import useJobApi from '~apis/useJobApi'
import Colors from '~constants/Colors'
import { refreshAuth, silentRefreshToken } from '~utils/auth'
import Toast from 'react-native-root-toast'

export default function ReportAssetFromAddressScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ReportAssetFromAddress'>) {
  const { getAssetByAddressId } = useAssetApi()
  const { getShipTos } = useMasterDataApi()
  const { createShipJob } = useJobApi()
  const [shipToId, setShipToId] = useState('')
  const [assets, setAssets] = useState<AssetDetailModel[]>([])
  const [totalAssets, setTotalAssets] = useState<number>(0)
  const [open, setOpen] = useState(false)
  const [addressOptions, setAddressOptions] = useState<SelectItemOption[]>([])

  //const [id] = useState(uuidv4());
  const [loading, setLoading] = useState(false)
  const [buttonDisplay, setButtonDisplay] = useState<'flex' | 'none'>('flex')

  const reportAsset = async () => {
    const payload: CreateShipJobModel = {
      shipToId: shipToId,
    }
    const res = await createShipJob(payload)
    if (res.status === 200) {
      Toast.show(`Job was created successfully`, {})
      navigation.navigate('JobDetails', { id: res.data })
    } else {
      Toast.show(`Create job failed`, {
        //position: Toast.positions.CENTER,
        textColor: Colors.red,
        backgroundColor: Colors.yellow,
      })
    }
  }

  const hideActionButton = () => {
    setButtonDisplay('none')
  }

  const showActionButton = () => {
    setButtonDisplay('flex')
  }

  const renderItem = ({ item }: ListRenderItemInfo<AssetDetailModel>) => {
    return (
      <Asset
        data={item}
        onPress={() =>
          navigation.navigate('AssetDetails', { assetId: item.assetId })
        }
      />
    )
  }

  const toggleDropdown = () => setOpen(!open)

  const setAssetFromAddress = async () => {
    setLoading(true)
    if (shipToId.length > 0) {
      const res = await getAssetByAddressId(shipToId)

      if (res.status === 200) {
        setAssets(res.data.records as AssetDetailModel[])
        setTotalAssets(res.data.totalRecords)
      }
    }

    setLoading(false)
  }

  const prepareData = async () => {
    const res = await getShipTos({ page: 0, size: 10, search: '' })

    if (res.status === 200) {
      const data = res.data.records as ShipToModel[]
      setAddressOptions(
        data.map((item) => ({ label: item.name, value: item.id }))
      )
    } else if (res.status === 401) {
      refreshAuth()
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', hideActionButton)
    Keyboard.addListener('keyboardDidHide', showActionButton)

    prepareData()

    // cleanup function
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow')
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [])

  useEffect(() => {
    ;(async function () {
      await setAssetFromAddress()
    })()
  }, [shipToId])

  return (
    <>
      <ScrollView
        style={baseStyles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={prepareData}
            colors={[Colors.yellow]}
          />
        }
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={baseStyles.container}
        >
          <View style={{ ...baseStyles.container, minHeight: 500 }}>
            <DropDownPicker
              placeholder="Select address"
              searchable={true}
              loading={loading}
              searchPlaceholder={'search...'}
              open={open}
              value={shipToId}
              items={addressOptions}
              setOpen={toggleDropdown}
              setValue={setShipToId}
              //setItems={setAddressOptions}
              listMode="MODAL"
              //itemSeparator={true}
              maxHeight={600}
              selectedItemContainerStyle={{
                backgroundColor: Colors.yellow,
              }}
              placeholderStyle={{ minWidth: 250 }}
              ListEmptyComponent={() => (
                <Text style={{ textAlign: 'center' }}>No item found</Text>
              )}
            />
            {loading && <Loading loading={loading} />}
            {shipToId.length > 0 && assets.length === 0 && (
              <Text style={{ marginTop: 10, marginBottom: 10 }}>
                No asset found
              </Text>
            )}
            {assets.length > 0 && (
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <FlatList
                  keyExtractor={(item) => item.assetId}
                  ListHeaderComponent={
                    <Text
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      Total {totalAssets}{' '}
                      {`${totalAssets > 1 ? 'assets' : 'asset'}`}
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
            <Icon name="save" type="font-awesome-5" size={28} color="white" />
          }
          title=" Create Job"
          disabled={shipToId.length === 0 || assets.length === 0}
          loading={loading}
          onPress={reportAsset}
        />
      </View>
    </>
  )
}
