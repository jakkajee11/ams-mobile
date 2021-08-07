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
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Overlay,
  Button,
  Icon,
  Header,
  Image,
  Input,
} from 'react-native-elements';
import Colors from '../constants/Colors';
import baseStyles from '../styles/baseStyles';

import { RootStackParamList } from '../types';

export default function ReportAssetScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ReportAsset'>) {
  const assetId = ''; //route.params.assetId;

  return (
    <>
      <Header
        leftComponent={{
          icon: 'menu',
          color: Colors.black,
          iconStyle: { color: Colors.black },
        }}
        centerComponent={{ text: 'MY TITLE', style: { color: Colors.black } }}
        rightComponent={{ icon: 'home', color: Colors.black }}
        backgroundColor={Colors.yellow}
      />
      <StatusBar backgroundColor={Colors.yellow} />
      <ScrollView style={baseStyles.scrollView}>
        <View style={baseStyles.container}>
          <View>
            <Input placeholder='Code' />
            <Input placeholder='Location' />
            <Input placeholder='Sub Location' />
            <Input placeholder='Detail' multiline numberOfLines={4} />
          </View>

          <View style={baseStyles.attachmentContainer}>
            <View>
              <Image
                source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
                style={baseStyles.image}
              />
              <Text>Img0.jpg</Text>
            </View>

            <View>
              <Image
                source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
                style={baseStyles.image}
              />
              <Text>Img1.jpg</Text>
            </View>
            <View>
              <Image
                source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
                style={baseStyles.image}
              />
              <Text>Img2.jpg</Text>
            </View>
            <View>
              <Image
                source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
                style={baseStyles.image}
              />
              <Text>Img3.jpg</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={baseStyles.buttonGroupBottom}>
        <Button
          icon={
            <Icon name='camera' type='font-awesome-5' size={28} color='white' />
          }
          title=' Take a photo'
        />
        <Button
          icon={
            <Icon name='save' type='font-awesome-5' size={28} color='white' />
          }
          title=' Submit'
        />
      </View>
    </>
  );
}
