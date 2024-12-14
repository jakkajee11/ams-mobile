import React from 'react'
import { Button, Icon, ListItem, Text } from 'react-native-elements'
import { AssetDetailModel } from '../../types/assets'
import { GestureResponderEvent, View } from 'react-native'
import Colors from '~constants/Colors'
import baseStyles from '~styles/baseStyles'
import Stack from '~components/shared/Stack'

interface AssetProps {
  data: AssetDetailModel
}

export default function AssetListItemContent({
  data: {
    id,
    assetTypeName,
    assetId,
    serialNo,
    assetStatusName,
    agedDays,
    agingDays,
    assetTypeDetailName,
    details,
  },
}: AssetProps) {
  return (
    <View style={{ ...baseStyles.column, alignItems: 'flex-start' }}>
      <View style={baseStyles.row}>
        <Stack direction="row">
          <Text>{serialNo}</Text>
          {agedDays && agingDays && (
            <Text>
              <Text
                style={{
                  color: agedDays > agingDays ? 'red' : 'green',
                }}
              >
                {agedDays}
              </Text>
              <Text>/</Text>
              <Text>{agingDays}</Text>
            </Text>
          )}
        </Stack>
      </View>
      <Text style={baseStyles.textSmallItalic}>
        {assetTypeName} / {assetTypeDetailName} / {assetStatusName}
      </Text>
      <Text style={baseStyles.textSmallItalic}>{details}</Text>
    </View>
  )
}
