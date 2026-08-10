import React from 'react';
import { ListItem } from '@rn-vui/themed';
import { AssetDetailModel } from '../../types/assets';

interface AssetProps {
  data: AssetDetailModel;
  onPress?: () => void;
}

export default function Asset({
  data: { id, assetTypeName, assetId, serialNo, assetStatusName },
  onPress,
}: AssetProps) {
  const handleOnPress = () => {
    onPress && onPress();
  };

  return (
    <ListItem key={id} bottomDivider onPress={handleOnPress}>
      <ListItem.Content>
        <ListItem.Title style={{ fontSize: 12 }}>
          {serialNo} {assetStatusName} {assetTypeName}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron name='chevron-right' type='feather' />
    </ListItem>
  );
}
