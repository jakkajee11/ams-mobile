import React from 'react'
import { FlatList, ListRenderItemInfo, View } from 'react-native'
import { Image, Text } from 'react-native-elements'
import { ATTACHMENT_TYPE } from '~constants/Status'
import baseStyles from '~styles/baseStyles'
import { AssetDetailModel } from '../../types/assets'
import Asset from './Asset'
import SwipeableAsset from './SwipeableAsset'

interface AssetProps {
  data: AssetDetailModel[] | []
  onPress?: () => void
  onDelete?: (id: string) => void
}

export default function AssetMinimalDetails({
  data,
  onPress,
  onDelete,
}: AssetProps) {
  const handleOnPress = () => {
    onPress && onPress()
  }

  const handleOnDelete = (id: string) => {
    handleOnDelete && handleOnDelete(id)
  }

  const renderItem = ({ item }: ListRenderItemInfo<AssetDetailModel>) => {
    return <SwipeableAsset data={item} onDelete={onDelete} />
  }

  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <FlatList
        keyExtractor={(item) => item.assetId}
        ListHeaderComponent={
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            Total {data.length} {`${data.length > 1 ? 'assets' : 'asset'}`}
          </Text>
        }
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
}
