import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { AssetModel } from '../../types/assets';
import { JobAssetModel } from '../../types/jobs';

interface JobAssetProps {
  data: JobAssetModel;
  onPress?: () => void;
}

export default function JobAsset({
  data: { id, jobAssetStatusName, assetId },
  onPress,
}: JobAssetProps) {
  const handleOnPress = () => {
    onPress && onPress();
  };
  return (
    <ListItem key={id} bottomDivider onPress={handleOnPress}>
      <ListItem.Content>
        <ListItem.Title style={{ fontSize: 12 }}>
          {assetId} {jobAssetStatusName} {assetId}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron name='x-circle' type='feather' color='red' />
    </ListItem>
  );
}
