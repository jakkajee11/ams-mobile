import { View } from 'react-native'
import { Text } from '@rn-vui/themed'
import baseStyles from '~styles/baseStyles'

type UnauthorizedProps = {
  header?: string
  message?: string
}

export default function Unauthorized({
  header = 'Unauthorized',
  message = 'You are not allowed to access this resource.',
}: UnauthorizedProps) {
  return (
    <View style={baseStyles.container}>
      <View>
        <Text h1>{header}</Text>
        <Text h2>{message}</Text>
      </View>
    </View>
  )
}
