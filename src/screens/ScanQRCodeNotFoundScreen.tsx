import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import baseStyles from '~styles/baseStyles';
import Colors from '../constants/Colors';

import { RootStackParamList } from '../types';

export default function ScanQRCodeFoundScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'ScanQRCodeNotFound'>) {
  const [assetId] = useState(route.params?.data ?? '');

  return (
    <>
      <StatusBar backgroundColor={Colors.yellow} />
      <View style={baseStyles.container}>
        <View style={baseStyles.column}>
          <View>
            <Text
              style={{ ...baseStyles.textCenter, fontSize: 18, color: 'black' }}
            >
              QR Code: {assetId}
            </Text>
            <Text
              style={{ ...baseStyles.textCenter, fontSize: 18, color: 'red' }}
            >
              NOT FOUND
            </Text>
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
            onPress={() => navigation.navigate('ReportAsset', { assetId })}
          />
        </View>
      </View>
    </>
  );
}
