import * as React from 'react'
import { BarcodeScanningResult, CameraCapturedPicture } from 'expo-camera'
import { Modal, View } from 'react-native'
import Camera from '~components/shared/Camera'

interface ModalCameraProps {
  openCamera(): void
  closeCamera(): void
  showCamera: boolean
  mode: 'photo' | 'scan'
  onTakePicture?(photo: CameraCapturedPicture | undefined): void
  onBarcodeScanned?({ type, data, cornerPoints }: BarcodeScanningResult): void
}

const ModalCamera = ({
  openCamera,
  closeCamera,
  showCamera,
  mode = 'photo',
  onTakePicture,
  onBarcodeScanned,
}: ModalCameraProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showCamera}
      presentationStyle={'overFullScreen'}
      onRequestClose={closeCamera}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          height: '100%',
          width: '100%',
        }}
      >
        {showCamera && (
          <Camera
            onClose={closeCamera}
            onTakePicture={onTakePicture}
            onBarcodeScanned={onBarcodeScanned}
            displayMode={mode}
          />
        )}
      </View>
    </Modal>
  )
}

export default ModalCamera
