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
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import { Overlay, Button, Icon, Header } from 'react-native-elements';
import Colors from '../constants/Colors';
import baseStyles from '../styles/baseStyles';

import { RootStackParamList } from '../types';

export default function ScanQRCodeFoundScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ScanQRCodeFound'>) {
  const assetId = ''; //route.params.assetId;

  return (
    <>
      <Header
        leftComponent={{
          icon: 'menu',
          color: Colors.black,
          iconStyle: { color: Colors.black },
        }}
        centerComponent={{ text: 'QR-DUMMY01', style: { color: Colors.black } }}
        rightComponent={{ icon: 'home', color: Colors.black }}
        backgroundColor={Colors.yellow}
      />
      <StatusBar backgroundColor={Colors.yellow} />
      <ScrollView style={baseStyles.scrollView}>
        <View style={baseStyles.container}>
          <Text style={baseStyles.qrCodeFoundLabel}>QR Code: QR-DUMMY01</Text>
          <View style={styles.row}>
            <Text>Asset ID: </Text>
            <Text>Asset Type:</Text>
          </View>
          <View style={styles.row}>
            <Text>Serial No.: </Text>
            <Text>Asset No.:</Text>
          </View>
          <View style={styles.row}>
            <Text>Cost Center: </Text>
            <Text>Year of Mfg:</Text>
          </View>
          <View style={styles.row}>
            <Text>Warrenty: </Text>
            <Text>Asset Class:</Text>
          </View>
          <View style={styles.row}>
            <Text>Location : </Text>
            <Text>Sub-Location: </Text>
          </View>
          <View style={styles.row}>
            <Text>Status : </Text>
          </View>
          <View style={styles.row}>
            <Text>Others: </Text>
          </View>
          <View style={styles.row}>
            <Text>Description: </Text>
          </View>

          <View style={styles.column}>
            <Text>Attachments</Text>
            <View style={baseStyles.attachmentContainer}>
              <Image
                source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
                style={baseStyles.image}
              />
              <Text style={baseStyles.imageLabel}>Image1.jpg</Text>
              <Image
                source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
                style={baseStyles.image}
              />
              <Text style={baseStyles.imageLabel}>Image2.jpg</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={baseStyles.buttonGroupBottom}>
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
        />
        <Button
          icon={
            <Icon
              name='check-circle'
              type='font-awesome-5'
              size={28}
              color='white'
            />
          }
          title=' CONFIRM'
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 2,
    padding: 5,
    //backgroundColor: Colors.yellow,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    color: 'red',
    margin: 20,
  },
  buttonGroupBottom: {
    width: '100%',
    padding: 5,
    justifyContent: 'space-around',
    flex: 0.2,
  },
});
