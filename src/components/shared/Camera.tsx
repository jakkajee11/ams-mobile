import React, { useState, useEffect, useRef, createRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  GestureResponderEvent,
} from 'react-native'
import {
  Camera as ExpoCamera,
  CameraViewProps,
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system/legacy'
import Constants from 'expo-constants'
import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons'

const landmarkSize = 2

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
}

interface IFlashIcons {
  [key: string]: 'flash-off' | 'flash-on' | 'flash-auto' | 'highlight'
}

const flashIcons: IFlashIcons = {
  off: 'flash-off',
  on: 'flash-on',
  auto: 'flash-auto',
  torch: 'highlight',
}

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
}

const wbIcons = {
  auto: 'wb-auto',
  sunny: 'wb-sunny',
  cloudy: 'wb-cloudy',
  shadow: 'beach-access',
  fluorescent: 'wb-iridescent',
  incandescent: 'wb-incandescent',
}

interface CameraProps {
  onClose(): void
  onTakePicture?(photo: CameraCapturedPicture | undefined): void
  showImagePicker?: boolean
  showOptions?: boolean
  displayMode: 'photo' | 'scan'
}

export default function Camera({
  onClose,
  onTakePicture,
  onBarcodeScanned,
  autofocus,
  showImagePicker = false,
  showOptions = false,
  mode = 'picture',
  displayMode = 'scan',
}: CameraProps & CameraViewProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const [cameraReady, setCameraReady] = useState(false)
  const [type, setType] = useState(ImagePicker.CameraType.back)
  const [saving, setSaving] = useState<boolean>(false)
  const [newPhotos, setNewPhotos] = useState<boolean>(false)
  const [flash, toggleFlash] = useState<string>('off')
  const [whiteBalance, toggleWB] = useState<string>('auto')
  const [showMoreOptions, toggleMoreOptions] = useState<boolean>(showOptions)
  const [showPickImage, setShowPickImage] = useState<boolean>(showImagePicker)
  const [scannedResult, setScannedResult] = useState('')

  const camera = useRef<CameraView>(null)

  useEffect(() => {
    ;(async () => {
      // Camera roll Permission
      if (Platform.OS === 'ios') {
        // const { status } = await Permissions.askAsync(
        //   Permissions.MEDIA_LIBRARY
        // );

        const status = permission?.status
        if (status !== ImagePicker.PermissionStatus.GRANTED) {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
      // Camera Permission
      const { status } = await ExpoCamera.requestCameraPermissionsAsync()

      setHasPermission(status === 'granted')
    })()
  }, [])

  async function takePicture() {
    try {
      if (camera) {
        //setSaving(true);
        const photo = await camera.current?.takePictureAsync({
          quality: 0.1, //Images.cameraQuality,
          base64: true,
          onPictureSaved: onPictureSaved,
          skipProcessing: true,
        })

        //onTakePicture(photo);
        //onClose();
      } else {
        console.log(['camera is undefined'])
      }
    } catch (err) {
      console.log(['error', err])
    }
  }

  async function onPictureSaved(photo: CameraCapturedPicture) {
    //setSaving(true);
    const savedPhoto = `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`
    // await FileSystem.moveAsync({
    //   from: photo.uri,
    //   to: savedPhoto,
    // });

    // console.log(['onPictureSaved', photo, savedPhoto]);

    //setSaving(false);
    //setNewPhotos(true);

    // update parent
    handleTakePicture(photo)
  }

  function handleTakePicture(photo: CameraCapturedPicture) {
    onTakePicture && onTakePicture(photo)
    onClose()
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
    })
  }

  function onCameraReady() {
    console.log('camera is ready for use')
    //setCameraReady(true);
  }

  function closeCamera() {
    onClose()
  }

  function TopBar() {
    return (
      <View style={styles.topBar}>
        {/* <TouchableOpacity style={styles.toggleButton} onPress={() => toggleFacing}>
        <Ionicons name="ios-reverse-camera" size={32} color="white" />
    </TouchableOpacity>*/}
        {/* <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => toggleFlash('on')}
        >
          <MaterialIcons name={flashIcons[flash]} size={32} color='white' />
        </TouchableOpacity> */}
        {/*<TouchableOpacity style={styles.toggleButton} onPress={() => toggleWB}>
        <MaterialIcons name={wbIcons[whiteBalance]} size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleFocus}>
        <Text style={[styles.autoFocusLabel, { color: autoFocus === 'on' ? "white" : "#6b6b6b" }]}>AF</Text>
      </TouchableOpacity>  */}
        <TouchableOpacity style={styles.toggleButton} onPress={closeCamera}>
          <Ionicons name="close-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
    )
  }

  function BottomBar() {
    return (
      <View style={styles.bottomBar}>
        {showMoreOptions && (
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => toggleMoreOptions(true)}
          >
            <Octicons name="kebab-horizontal" size={30} color="white" />
          </TouchableOpacity>
        )}
        <View style={{ flex: 0.4 }}>
          {displayMode === 'photo' && (
            <TouchableOpacity
              onPress={takePicture}
              style={{ alignSelf: 'center' }}
              //disabled={!cameraReady}
            >
              {saving && <Text style={{ color: 'white' }}>กำลังบันทึกภาพ</Text>}
              {!saving && (
                <Ionicons name="radio-button-on" size={70} color="white" />
              )}
            </TouchableOpacity>
          )}
        </View>
        {showPickImage && (
          <TouchableOpacity style={styles.bottomButton} onPress={pickImage}>
            <View>
              <Foundation name="thumbnails" size={30} color="white" />
              {newPhotos && <View style={styles.newPhotosDot} />}
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  function ScanBox() {
    return (
      <View
        style={{
          flex: 0.5,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'white',
          borderRadius: 5,
          borderWidth: 1,
        }}
      >
        {/* <Text>QR Code/Bar Code</Text> */}
      </View>
    )
  }

  // function onBarCodeScanned(result: BarcodeScanningResult) {
  //   console.log(['handleBarCodeScanned', result])
  //   setScannedResult(result.data)
  // }

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1, justifyContent: 'space-between' }}
        facing={type}
        //autoFocus={AutoFocus.on}
        //useCamera2Api={false}
        ratio={'4:3'}
        ref={camera}
        onCameraReady={onCameraReady}
        onBarcodeScanned={onBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'pdf417'],
        }}
      >
        <TopBar />
        {displayMode === 'scan' && <ScanBox />}
        <BottomBar />
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    //justifyContent: 'space-around',
    justifyContent: 'flex-end',
    paddingTop: Constants.statusBarHeight / 2,
  },
  bottomBar: {
    //paddingBottom: isIPhoneX ? 25 : 5,
    backgroundColor: 'transparent',
    //alignSelf: 'flex-end',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flex: 0.12,
    flexDirection: 'row',
  },
  noPermissions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggleButton: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomButton: {
    flex: 0.3,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPhotosDot: {
    position: 'absolute',
    top: 0,
    right: -5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4630EB',
  },
  options: {
    position: 'absolute',
    bottom: 80,
    left: 30,
    width: 200,
    height: 160,
    backgroundColor: '#000000BA',
    borderRadius: 4,
    padding: 10,
  },
  detectors: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pictureQualityLabel: {
    fontSize: 10,
    marginVertical: 3,
    color: 'white',
  },
  pictureSizeContainer: {
    flex: 0.5,
    alignItems: 'center',
    paddingTop: 10,
  },
  pictureSizeChooser: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pictureSizeLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    // width: landmarkSize,
    // height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
})
