import { StackScreenProps } from '@react-navigation/stack'
import _ from 'lodash'
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Button, Dialog, Icon } from 'react-native-elements'
import 'react-native-get-random-values'
import useAssetApi from '~apis/useAssetApi'
import useMasterDataApi from '~apis/useMasterDataApi'
import { AssetDetailModel } from '~types/assets'
import baseStyles from '../styles/baseStyles'
import { RootStackParamList } from '../types'
import Loading from '~components/shared/Loading'
import Colors from '~constants/Colors'
import DropDownPicker from 'react-native-dropdown-picker'
import { SelectItemOption } from '~types/selectOptions'
import ModalCamera from '~components/shared/ModalCamera'
import { BarcodeScanningResult } from 'expo-camera'
import Toast from 'react-native-root-toast'
import { AssetStatusModel, LocationModel } from '~types/masterData'
import AssetMinimalDetails from '~components/assets/AssetMinimalDetails'
import Unauthorized from '~components/Unauthorized'
import useUserApi from '~apis/useUserApi'
import { PERMISSION, RESOURCES } from '~constants/Status'

export default function UpdateAssetStatusAndLocationScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'StatusAndLocation'>) {
  const { hasRights } = useUserApi()
  const { getAssetInfo, updateStatusAndLocations } = useAssetApi()
  const { getWarehouseAssetStatuses, getLocations } = useMasterDataApi()
  const [assetStatus, setAssetStatus] = useState('')
  const [location, setLocation] = useState('')
  const [searchText, setSearchText] = useState('')
  const [assets, setAssets] = useState<AssetDetailModel[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [openLocation, setOpenLocation] = useState(false)
  const [assetStatusOptions, setAssetStatusOptions] = useState<
    SelectItemOption[]
  >([])
  const [locationOptions, setLocationOptions] = useState<SelectItemOption[]>([])
  const [showCamera, setShowCamera] = useState(false)
  const [__, setScannedResult] = useState('')
  const [dialogVisible, setDialogVisible] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)

  const openCamera = () => setShowCamera(true)
  const closeCamera = () => setShowCamera(false)
  const toggleDialog = () => setDialogVisible(!dialogVisible)

  const reset = () => {
    setAssets([])
    setAssetStatus('')
    setLocation('')
  }

  const submitForm = async () => {
    setLoading(true)

    toggleDialog()

    const data = assets.map((x) => ({
      id: x.id,
      assetStatusId: x.assetStatusId,
      locationId: x.locationId,
    }))

    const res = await updateStatusAndLocations(data)

    if (res && res.status === 200) {
      Toast.show(`Asset was updated successfully`, {
        position: Toast.positions.CENTER,
      })
      reset()
    } else {
      Alert.alert('Error', 'Update asset failed')
    }

    setLoading(false)
  }

  const fetchRights = async () => {
    const res = await hasRights(
      RESOURCES.AssetStatusAndLocation,
      PERMISSION.Update
    )
    if (res.status === 200) {
      setHasPermission(res.data)
    }
  }

  const fetchStatus = async () => {
    setLoading(true)
    const res = await getWarehouseAssetStatuses({
      page: 1,
      size: 100,
      search: '',
    })

    if (res.status === 200) {
      const data = res.data as AssetStatusModel[]
      setAssetStatusOptions(
        data.map((item) => ({ label: item.name, value: item.id }))
      )
    }

    setLoading(false)
  }

  const fetchLocation = async () => {
    setLoading(true)
    const res = await getLocations({
      page: 1,
      size: 20,
      search: searchText,
    })

    if (res.status === 200) {
      const data = res.data.records as LocationModel[]
      setLocationOptions(
        data.map((item) => ({ label: item.name, value: item.id }))
      )
    }

    setLoading(false)
  }

  const toggleDropdown = () => setOpen(!open)
  const toggleLocationDropdown = () => setOpenLocation(!openLocation)

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
      if (!assets.some((x) => x.id === res.data.id))
        setAssets([...assets, res.data])
      else Alert.alert('Error', 'Item already added to list')
    }

    setLoading(false)
  }

  const handleOnPress = (assetId: string) => {
    navigation.navigate('AssetDetails', { assetId })
  }

  const handleOnDelete = (id: string) => {
    setAssets([...assets.filter((x) => x.id !== id)])
  }

  useEffect(() => {
    ;(async function () {
      await fetchRights()
      await fetchStatus()
    })()
  }, [])

  useEffect(() => {
    ;(async function () {
      await fetchLocation()
    })()
  }, [searchText])

  return (
    <>
      {hasPermission ? (
        <>
          <ScrollView style={baseStyles.scrollView}>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              style={baseStyles.container}
            >
              <View>
                <DropDownPicker
                  placeholder="Select asset status"
                  searchable={false}
                  loading={loading}
                  open={open}
                  value={assetStatus}
                  items={assetStatusOptions}
                  setOpen={toggleDropdown}
                  setValue={setAssetStatus}
                  listMode="MODAL"
                  maxHeight={600}
                  selectedItemContainerStyle={{
                    backgroundColor: Colors.yellow,
                  }}
                  ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center' }}>No item found</Text>
                  )}
                />

                <DropDownPicker
                  placeholder="Select location"
                  searchable={true}
                  searchPlaceholder={'type to search...'}
                  loading={loading}
                  open={openLocation}
                  value={location}
                  items={locationOptions}
                  setOpen={toggleLocationDropdown}
                  setValue={setLocation}
                  listMode="MODAL"
                  onChangeSearchText={(text: string) => {
                    setSearchText(text)
                  }}
                  maxHeight={600}
                  selectedItemContainerStyle={{
                    backgroundColor: Colors.yellow,
                  }}
                  ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center' }}>No item found</Text>
                  )}
                />
                {assets.length > 0 && (
                  <AssetMinimalDetails
                    data={assets}
                    onPress={handleOnPress}
                    onDelete={handleOnDelete}
                  />
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
                              name="clipboard"
                              type="font-awesome-5"
                              size={28}
                              color={Colors.white}
                            />
                          }
                          title=" Report this item"
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
            </KeyboardAvoidingView>
          </ScrollView>

          <View style={{ ...baseStyles.buttonGroupBottom, flex: 0.2 }}>
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
            />

            {assets.length > 0 &&
              assetStatus.length > 0 &&
              location.length > 0 && (
                <>
                  <Button
                    icon={
                      <Icon
                        name="check"
                        type="font-awesome-5"
                        size={28}
                        color="white"
                      />
                    }
                    title="  Submit"
                    onPress={toggleDialog}
                  />
                  <Dialog
                    style={{ width: 1000 }}
                    isVisible={dialogVisible}
                    onBackdropPress={toggleDialog}
                  >
                    <Dialog.Title title="Please confirm?" />

                    <Dialog.Actions>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          flex: 1,
                        }}
                      >
                        <Dialog.Button title="CONFIRM" onPress={submitForm} />
                        <Dialog.Button title="CANCEL" onPress={toggleDialog} />
                      </View>
                    </Dialog.Actions>
                  </Dialog>
                </>
              )}
          </View>

          <ModalCamera
            showCamera={showCamera}
            openCamera={openCamera}
            closeCamera={closeCamera}
            onBarcodeScanned={handleBarCodeScanned}
            mode="scan"
          />
        </>
      ) : (
        <Unauthorized />
      )}
    </>
  )
}
