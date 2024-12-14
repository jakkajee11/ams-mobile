import * as React from 'react'
import { StyleSheet, View } from 'react-native'

interface StackProps {
  direction?: 'row' | 'column'
  children: React.ReactElement | React.ReactNode
}

const Stack = ({ direction = 'column', children }: StackProps) => (
  <View style={{ ...styles.stack, flexDirection: direction }}>{children}</View>
)

export default Stack

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    //flexDirection: 'column',
    justifyContent: 'space-between',
  },
})
