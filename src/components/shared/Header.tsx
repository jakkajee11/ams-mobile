import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Header as RNHeader, Icon } from '@rn-vui/themed';
import Colors from '~/constants/Colors';

interface HeaderProps {
  // text: string;
  // icon?: string;
  // onPress?: () => void;
  leftComponent?: any; //React.ReactNode;
  centerComponent?: any;
  rightComponent?: any; //React.ReactNode;
  title: string;
}

const LeftComponent = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ width: '100%' }}
      // onPress (not onPressIn) so a touch that is dragged away doesn't navigate,
      // and guard goBack when there is no screen to go back to
      onPress={() => navigation.canGoBack() && navigation.goBack()}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <Icon
        name='arrow-left'
        type='font-awesome-5'
        //onPress={() => navigation.goBack()}
      />
    </TouchableOpacity>
  );
};

const CenterComponent = (title: string) => {
  const navigation = useNavigation();
  return <Text>{title}</Text>;
};

const RightComponent = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ width: '100%' }}
      onPress={() => navigation.navigate('Home' as never)}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="button"
      accessibilityLabel="Go to home"
    >
      <Icon
        name='home'
        type='font-awesome-5'
        //onPress={() => navigation.navigate('Home')}
      />
    </TouchableOpacity>
  );
};

const Header = ({
  title,
  leftComponent = LeftComponent,
  rightComponent = RightComponent,
}: HeaderProps) => (
  <RNHeader
    leftComponent={leftComponent}
    centerComponent={{
      text: title,
      style: { fontWeight: 'bold', fontSize: 16 },
    }}
    rightComponent={rightComponent}
    backgroundColor={Colors.yellow}
  />
);

export default Header;
