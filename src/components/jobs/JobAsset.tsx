import React from 'react';
import { ListItem } from 'react-native-elements';
import { JobAssetModel } from '../../types/jobs';

interface JobAssetProps {
  data: JobAssetModel;
  onPress?: () => void;
}

export default function JobAsset({
  data: { key, location, assetTypeName, assetId },
  onPress,
}: JobAssetProps) {
  const handleOnPress = () => {
    onPress && onPress();
  };
  return (
    <ListItem key={key} bottomDivider onPress={handleOnPress}>
      <ListItem.Content>
        <ListItem.Title style={{ fontSize: 12 }}>
          {assetTypeName} / {assetId} / {location}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron name='x-circle' type='feather' color='red' />
    </ListItem>
  );
}
