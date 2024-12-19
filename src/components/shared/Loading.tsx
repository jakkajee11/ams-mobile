import * as React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import Colors from '~constants/Colors'
import baseStyles from '~styles/baseStyles'

interface LoadingProps {
  loading: boolean
  size?: 'large' | 'small'
  color?: string
}

const Loading = ({
  loading,
  size = 'large',
  color = Colors.yellow,
}: LoadingProps) => (
  <Modal
    visible={loading}
    transparent={true}
    animationType="fade"
    statusBarTranslucent={true}
  >
    <View style={baseStyles.column}>
      <ActivityIndicator animating={loading} size={size} color={color} />
    </View>
  </Modal>
)

export default Loading
