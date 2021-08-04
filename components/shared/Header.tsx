import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Header as RNHeader } from 'react-native-elements';
import Colors from '../../constants/Colors';

interface HeaderProps {
  // text: string;
  // icon?: string;
  // onPress?: () => void;
}

const Header = (props: HeaderProps) => (
  <RNHeader
    leftComponent={{
      icon: 'menu',
      color: '#fff',
      iconStyle: { color: '#fff' },
    }}
    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
    rightComponent={{ icon: 'home', color: '#fff' }}
    backgroundColor={Colors.yellow}
  />
);

export default Header;
