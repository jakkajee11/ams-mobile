import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {
  BarCodeScanningResult,
  CameraCapturedPicture,
  Camera as ExpoCamera,
} from 'expo-camera';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Overlay, Button, Icon, Image } from 'react-native-elements';
import Header from '~components/shared/Header';
import Colors from '../constants/Colors';

import { RootStackParamList } from '../types';

export default function ScanQRCodeFoundScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ScanQRCodeNotFound'>) {
  const [assetId] = useState(route.params?.data ?? '');

  return (
    <>
      {/* <Header
        leftComponent={{
          icon: 'angle-left',
          color: Colors.black,
          iconStyle: { color: Colors.black },
          onPress: () => navigation.goBack()
        }}
        centerComponent={{ text: 'MY TITLE', style: { color: Colors.black } }}
        rightComponent={{ icon: 'home', type: '', color: Colors.black, onPress: () => navigation.navigate('Home') }}
        backgroundColor={Colors.yellow}
      /> */}
      <Header title={assetId} />
      <StatusBar backgroundColor={Colors.yellow} />
      <View style={styles.container}>
        <View style={styles.column}>
          <View>
            <Text style={{ ...styles.text, color: 'black' }}>
              QR Code: {assetId} / {route.params?.data}
            </Text>
            <Text style={{ ...styles.text, color: 'red' }}>NOT FOUND</Text>
            <Button
              icon={
                <Icon
                  name='clipboard'
                  type='font-awesome-5'
                  size={28}
                  color='white'
                />
              }
              title=' Report this item'
              onPress={() => navigation.navigate('ReportAsset', 'x-code')}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            padding: 5,
            justifyContent: 'space-between',
            flex: 0.5,
          }}
        >
          {/* <Button
            icon={
              <Icon
                name='clipboard'
                type='font-awesome-5'
                size={28}
                color='white'
              />
            }
            title=' Report this item'
          /> */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
  },
  text: {
    fontSize: 18,
    //color: 'red',
    margin: 20,
    textAlign: 'center',
  },
});
