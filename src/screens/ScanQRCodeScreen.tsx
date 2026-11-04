import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import {
  BarcodeScanningResult,
  CameraCapturedPicture,
  Camera as ExpoCamera,
} from 'expo-camera'
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button, Icon } from '@rn-vui/themed'
import useAssetApi from '~apis/useAssetApi'
import ModalCamera from '~components/shared/ModalCamera'
import Camera from '../components/shared/Camera'

import { RootStackParamList } from '../types'

export default function ScanQRCodeScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'ScanQRCode'>) {
  const { getAssetInfo } = useAssetApi()
  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(false)

  const [scannedResult, setScannedResult] = useState('')
  const [visible, setVisible] = useState(isFocused)

  const prepareCamera = () => {
    setScannedResult('')
    openCamera()
  }

  const openCamera = () => setVisible(true)
  const closeCamera = () => setVisible(false)

  const handleBarCodeScanned = async ({
    type,
    data,
    cornerPoints,
  }: BarcodeScanningResult) => {
    setScannedResult(data)
    closeCamera()
    // check asset in system
    setLoading(true)
    try {
      const res = await getAssetInfo(data)
      if (res && res.status === 200 && res.data) {
        navigation.navigate('ScanQRCodeFound', { data: res.data })
      } else {
        navigation.navigate('ScanQRCodeNotFound', { data })
      }
    } catch (err) {
      Alert.alert('Error', 'Unable to check this QR code, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{scannedResult}</Text>
        {/* {loading && <Text>Loading...</Text>} */}
        <Button
          // style={{ width: '100px' }}
          title={
            <View
              style={{
                padding: 3,
                alignItems: 'center',
              }}
            >
              <Icon
                name="qr-code-scanner"
                type="MaterialIcons"
                size={60}
                color="white"
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                }}
              >
                SCAN QR CODE
              </Text>
            </View>
          }
          onPress={prepareCamera}
          loading={loading}
        />
        <ModalCamera
          showCamera={visible}
          openCamera={openCamera}
          closeCamera={closeCamera}
          onBarcodeScanned={handleBarCodeScanned}
          mode="scan"
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'red',
    margin: 20,
  },
})
