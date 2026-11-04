import React from 'react'
import { Button, Icon, ListItem, Text } from '@rn-vui/themed'
import { AssetDetailModel } from '../../types/assets'
import { GestureResponderEvent } from 'react-native'
import Colors from '~constants/Colors'
import AssetListItemContent from './AssetListItemContent'

interface AssetProps {
  data: AssetDetailModel
  onPress?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function SwipeableAsset({
  //data: { id, assetTypeName, assetId, serialNo, assetStatusName },
  data,
  onPress,
  onDelete,
}: AssetProps) {
  const handleOnPress = (id: string) => {
    onPress && onPress(id)
  }

  const handleOnDelete = (id: string) => {
    onDelete && onDelete(id)
  }

  const RightContent = (value: any) => (
    <Button
      containerStyle={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.darkGrey,
      }}
      type="clear"
      icon={{ name: 'delete-outline' }}
      accessibilityLabel="Remove from list"
      onPress={() => handleOnDelete(value.id)}
    />
  )

  return (
    <ListItem.Swipeable
      leftWidth={80}
      rightWidth={90}
      rightContent={<RightContent id={data.id} />}
      onPress={() => handleOnPress(data.assetId)}
    >
      <ListItem.Content>
        <AssetListItemContent data={data} />
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
}
