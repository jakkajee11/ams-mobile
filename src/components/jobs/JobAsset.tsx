import React from 'react';
import { ListItem } from 'react-native-elements';
import Colors from '~constants/Colors';
import { JOB_ASSET_STATUS } from '~constants/Status';
import { JobAssetModel } from '../../types/jobs';

interface JobAssetProps {
  data: JobAssetModel;
  onPress?: () => void;
}

export default function JobAsset({
  data: {
    key,
    location,
    assetTypeName,
    assetId,
    serialNo,
    jobAssetStatusId,
    assetStatusName,
  },
  onPress,
}: JobAssetProps) {
  const handleOnPress = () => {
    onPress && onPress();
  };
  return (
    <ListItem key={key} bottomDivider onPress={handleOnPress}>
      <ListItem.Content>
        <ListItem.Title style={{ fontSize: 12 }}>
          {assetTypeName} / {serialNo} / {assetStatusName}
        </ListItem.Title>
      </ListItem.Content>
      {/* <ListItem.Chevron name={jobAssetStatusId === JOB_ASSET_STATUS.Checked ? '' : ''} type='feather' color='red' /> */}
      {jobAssetStatusId === JOB_ASSET_STATUS.NotCheck && (
        <ListItem.Chevron name='x-circle' type='feather' color={Colors.red} />
      )}
      {jobAssetStatusId === JOB_ASSET_STATUS.Checked && (
        <ListItem.Chevron
          name='check-circle'
          type='AntDesign'
          color={Colors.green}
        />
      )}
    </ListItem>
  );
}
