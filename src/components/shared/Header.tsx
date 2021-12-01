import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Header as RNHeader, Icon } from 'react-native-elements';
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
      //onPress={() => handleOnPress(jobNumber)}
      onPressIn={() => navigation.goBack()}
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
      //onPress={() => handleOnPress(jobNumber)}
      onPressIn={() => navigation.navigate('Home')}
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
