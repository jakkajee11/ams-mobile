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
  CameraViewProps,
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
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
  const [permission, requestPermission] = useCameraPermissions()
  const [cameraReady, setCameraReady] = useState(false)
  const [type, setType] = useState<CameraType>('back')
  const [saving, setSaving] = useState<boolean>(false)
  const [newPhotos, setNewPhotos] = useState<boolean>(false)
  const [flash, toggleFlash] = useState<string>('off')
  const [whiteBalance, toggleWB] = useState<string>('auto')
  const [showMoreOptions, toggleMoreOptions] = useState<boolean>(showOptions)
  const [showPickImage, setShowPickImage] = useState<boolean>(showImagePicker)
  const camera = useRef<CameraView>(null)
  // CameraView fires onBarcodeScanned continuously while a code is in view;
  // only forward the first result per camera session.
  const scannedRef = useRef(false)
  // prevent multiple shutter presses from submitting several photos
  const takingPictureRef = useRef(false)

  useEffect(() => {
    // Request camera permission via the expo-camera hook. (The previous check
    // read `permission` before it was loaded and wrongly alerted about camera-roll
    // access on every iOS open.)
    if (permission && permission.status === 'undetermined') {
      requestPermission()
    }
  }, [permission])

  function handleBarcodeScanned(result: BarcodeScanningResult) {
    if (scannedRef.current) return
    scannedRef.current = true
    onBarcodeScanned && onBarcodeScanned(result)
  }

  async function takePicture() {
    if (takingPictureRef.current) return
    takingPictureRef.current = true
    try {
      if (camera.current) {
        setSaving(true)
        const photo = await camera.current.takePictureAsync({
          quality: 0.1, //Images.cameraQuality,
          base64: true,
          onPictureSaved: onPictureSaved,
          skipProcessing: true,
        })

        //onTakePicture(photo);
        //onClose();
      } else {
        console.log(['camera is undefined'])
        takingPictureRef.current = false
        setSaving(false)
      }
    } catch (err) {
      console.log(['error', err])
      takingPictureRef.current = false
      setSaving(false)
    }
  }

  async function onPictureSaved(photo: CameraCapturedPicture) {
    //setSaving(true);
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
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={closeCamera}
          accessibilityRole="button"
          accessibilityLabel="Close camera"
        >
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
              disabled={saving}
              accessibilityRole="button"
              accessibilityLabel="Take photo"
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

  if (!permission) {
    return <View style={styles.container} />
  }
  if (!permission.granted) {
    // Previously a bare "No access to camera" text with no way to close the
    // modal (iOS has no back button) or to grant access.
    return (
      <View style={[styles.container, styles.noPermissions]}>
        <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
          Camera access is required to {displayMode === 'scan' ? 'scan QR codes' : 'take photos'}.
          {!permission.canAskAgain && '\nPlease enable it in your device settings.'}
        </Text>
        {permission.canAskAgain && (
          <TouchableOpacity
            onPress={requestPermission}
            style={styles.permissionButton}
            accessibilityRole="button"
          >
            <Text style={{ color: 'black', fontWeight: '600' }}>Allow camera</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={closeCamera}
          style={styles.permissionButton}
          accessibilityRole="button"
        >
          <Text style={{ color: 'black', fontWeight: '600' }}>Close</Text>
        </TouchableOpacity>
      </View>
    )
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
        onBarcodeScanned={
          displayMode === 'scan' && onBarcodeScanned
            ? handleBarcodeScanned
            : undefined
        }
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
  permissionButton: {
    backgroundColor: '#ffb900',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    minWidth: 160,
    alignItems: 'center',
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
