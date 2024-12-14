import { StackScreenProps } from '@react-navigation/stack'
import _ from 'lodash'
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
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
  Modal,
} from 'react-native'
import { Button, Dialog, Icon, Image, Input, Text } from 'react-native-elements'
import 'react-native-get-random-values'
import useAssetApi from '~apis/useAssetApi'
import useMasterDataApi from '~apis/useMasterDataApi'
import {
  AssetDetailModel,
  ReportAssetModel,
  UpdateAssetStatusAndLocationModel,
} from '~types/assets'
import baseStyles from '../styles/baseStyles'
import { RootStackParamList } from '../types'
import Loading from '~components/shared/Loading'
import Colors from '~constants/Colors'
import DropDownPicker from 'react-native-dropdown-picker'
import { SelectItemOption } from '~types/selectOptions'
import ModalCamera from '~components/shared/ModalCamera'
import { BarcodeScanningResult, CameraCapturedPicture } from 'expo-camera'
import Toast from 'react-native-root-toast'
import { AssetStatusModel, LocationModel } from '~types/masterData'
import AssetMinimalDetails from '~components/assets/AssetMinimalDetails'
import Logo from '~components/shared/Logo'
import Stack from '~components/shared/Stack'
import AssetDetails from '~components/assets/AssetDetails'

export default function AssetAgingScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'AssetAging'>) {
  const { getAssetInfo, searchAssets, updateStatusAndLocations } = useAssetApi()
  const { getWarehouseAssetStatuses, getLocations } = useMasterDataApi()
  const [searchText, setSearchText] = useState('')
  const [asset, setAsset] = useState<AssetDetailModel>()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [openLocation, setOpenLocation] = useState(false)

  const [showCamera, setShowCamera] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [__, setScannedResult] = useState('')

  const openCamera = () => setShowCamera(true)
  const closeCamera = () => setShowCamera(false)

  const toggleModal = () => setModalVisible(!modalVisible)

  const handleBarCodeScanned = async ({
    type,
    data,
    cornerPoints,
  }: BarcodeScanningResult) => {
    setScannedResult(data)
    closeCamera()
    // check asset in system
    setLoading(true)
    const res = await getAssetInfo(data)
    if (res && res.status === 200 && res.data) {
      setAsset(res.data)
      navigation.navigate('AssetAgingDetails', { data: res.data })
    } else Alert.alert('Error', 'Item not found')

    setLoading(false)
  }

  return (
    <>
      <View style={{ ...baseStyles.container }}>
        {/* <View style={{ backgroundColor: Colors.yellow }}>
          <Logo />
        </View> */}

        <View style={{ height: 350 }}>
          <Stack>
            <Text h3>Warehouse Asset Aging</Text>
            <Button
              icon={
                <Icon
                  name="list"
                  type="feather"
                  size={28}
                  color={Colors.white}
                />
              }
              title="  AGING LIST"
              onPress={() => navigation.navigate('AssetAgingList')}
            />
            <Button
              icon={
                <Icon
                  name="qrcode"
                  type="font-awesome-5"
                  size={28}
                  color="white"
                />
              }
              title="  Start Scan"
              onPress={openCamera}
              loading={loading}
            />
          </Stack>
        </View>

        <ModalCamera
          showCamera={showCamera}
          openCamera={openCamera}
          closeCamera={closeCamera}
          onBarcodeScanned={handleBarCodeScanned}
          mode="scan"
        />
      </View>
    </>
  )
}
