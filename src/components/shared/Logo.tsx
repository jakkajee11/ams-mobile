import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from '@rn-vui/themed'

const Logo = () => (
  <Image
    source={require('../../assets/images/jungheinrich-logo.png')}
    style={styles.logo}
  />
)

export default Logo

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 100,
    marginTop: 20,
  },
})
